// migrate.mjs

import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import fetch from 'node-fetch'; // Remove if using Node 18+
dotenv.config();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.NEXT_PUBLIC_SANITY_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-06-14';

if (!projectId || !dataset || !token) {
    console.error('Please ensure your environment variables are set.');
    process.exit(1);
}

const client = createClient({
    projectId,
    dataset,
    token,
    apiVersion,
    useCdn: false,
});

// List of category URLs to migrate
const categoryUrls = [
    "https://dummyjson.com/products/category/beauty",
    "https://dummyjson.com/products/category/fragrances",
    "https://dummyjson.com/products/category/furniture",
    "https://dummyjson.com/products/category/groceries",
    "https://dummyjson.com/products/category/home-decoration",
    "https://dummyjson.com/products/category/kitchen-accessories",
    "https://dummyjson.com/products/category/laptops",
    "https://dummyjson.com/products/category/mens-shirts",
    "https://dummyjson.com/products/category/mens-shoes",
    "https://dummyjson.com/products/category/mens-watches",
    "https://dummyjson.com/products/category/mobile-accessories",
    "https://dummyjson.com/products/category/motorcycle",
    "https://dummyjson.com/products/category/skin-care",
    "https://dummyjson.com/products/category/smartphones",
    "https://dummyjson.com/products/category/sports-accessories",
    "https://dummyjson.com/products/category/sunglasses",
    "https://dummyjson.com/products/category/tablets",
    "https://dummyjson.com/products/category/tops",
    "https://dummyjson.com/products/category/vehicle",
    "https://dummyjson.com/products/category/womens-bags",
    "https://dummyjson.com/products/category/womens-dresses",
    "https://dummyjson.com/products/category/womens-jewellery",
    "https://dummyjson.com/products/category/womens-shoes",
    "https://dummyjson.com/products/category/womens-watches"
];

/**
 * Check if a category with the given title exists.
 * If not, create it and return its _id.
 */
async function getOrCreateCategory(categoryName) {
    const query = `*[_type == "category" && title == $title][0]{ _id }`;
    const existingCategory = await client.fetch(query, { title: categoryName });
    if (existingCategory) {
        return existingCategory._id;
    }
    // Create a new category document
    const newCategory = await client.create({
        _type: 'category',
        title: categoryName,
        slug: { _type: 'slug', current: categoryName.toLowerCase().replace(/\s+/g, '-') },
    });
    return newCategory._id;
}

/**
 * Generates a slug (max 96 characters) from the product title.
 */
function generateSlug(title) {
    return title.toLowerCase().replace(/\s+/g, '-').slice(0, 96);
}

/**
 * Uploads an image from a URL to Sanity and returns an image object.
 */
async function uploadImage(imageUrl) {
    try {
        const res = await fetch(imageUrl);
        if (!res.ok) {
            throw new Error(`Failed to fetch image ${imageUrl}: ${res.statusText}`);
        }
        const arrayBuffer = await res.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        // Extract a filename from the URL
        const urlParts = imageUrl.split('/');
        const filename = urlParts[urlParts.length - 1].split('?')[0];
        const asset = await client.assets.upload('image', buffer, {
            filename,
            contentType: res.headers.get('content-type') || 'image/jpeg',
        });
        return { _type: 'image', asset: { _ref: asset._id } };
    } catch (error) {
        console.error('Error uploading image:', error);
        return null;
    }
}

/**
 * Fetches product data from the API for a given category URL,
 * uploads images, and creates product documents in Sanity.
 */
async function migrateCategoryProducts(categoryUrl) {
    try {
        // Extract the category name from the URL
        const rawCategoryName = categoryUrl.split('/').pop(); // e.g., "mobile-accessories"
        // Optionally, replace hyphens with spaces and capitalize words:
        const categoryName = rawCategoryName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

        console.log(`\n🚀 Migrating category: ${categoryName}`);

        // Ensure the category exists
        const categoryId = await getOrCreateCategory(categoryName);

        // Fetch product data for the category
        const response = await fetch(categoryUrl);
        if (!response.ok) {
            console.error(`Failed to fetch products for ${categoryName}: ${response.statusText}`);
            return;
        }
        const data = await response.json();
        const products = data.products;
        if (!products || !products.length) {
            console.error(`No products found for ${categoryName}.`);
            return;
        }

        for (const product of products) {
            console.log(`   📦 Migrating product: ${product.title}`);

            // Upload thumbnail and images
            const thumbnailAsset = await uploadImage(product.thumbnail);
            const imageAssets = [];
            for (const imgUrl of product.images) {
                const asset = await uploadImage(imgUrl);
                if (asset) imageAssets.push(asset);
            }

            const doc = {
                _type: 'product',
                title: product.title,
                slug: { _type: 'slug', current: generateSlug(product.title) },
                description: product.description,
                category: { _ref: categoryId },
                price: product.price,
                discountPercentage: product.discountPercentage,
                rating: product.rating,
                stock: product.stock,
                tags: product.tags,
                brand: product.brand,
                sku: product.sku,
                weight: product.weight,
                dimensions: product.dimensions,
                warrantyInformation: product.warrantyInformation,
                shippingInformation: product.shippingInformation,
                availabilityStatus: product.availabilityStatus,
                reviews: product.reviews, // Assumes review structure matches your schema
                returnPolicy: product.returnPolicy,
                minimumOrderQuantity: product.minimumOrderQuantity || 1,
                meta: product.meta,
                images: imageAssets,
                thumbnail: thumbnailAsset,
            };

            try {
                const created = await client.create(doc);
                console.log(`      ✅ Created product with ID: ${created._id}`);
            } catch (error) {
                console.error(`      ❌ Error creating product ${product.title}:`, error);
            }
        }
    } catch (error) {
        console.error(`Error migrating category ${categoryUrl}:`, error);
    }
}

/**
 * Loops through all category URLs and migrates each one.
 */
async function migrateAllCategories() {
    console.log("\n🔄 Starting full migration...\n");
    for (const url of categoryUrls) {
        await migrateCategoryProducts(url);
    }
    console.log("\n🎉 Migration complete!");
    process.exit(0);
}

migrateAllCategories().catch((error) => {
    console.error("❌ Migration error:", error);
    process.exit(1);
});

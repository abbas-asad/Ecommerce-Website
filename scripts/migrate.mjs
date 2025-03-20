// migrate.mjs

import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import fetch from 'node-fetch'; // If using Node 18+, you might remove this line
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
 * Uploads an image from a URL to Sanity and returns an image object
 * that can be used in a document.
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
 * Fetches product data from the API, uploads images, and creates product documents in Sanity.
 */
async function migrateProducts() {
  const apiUrl = 'https://dummyjson.com/products/category/womens-dresses';
  const response = await fetch(apiUrl);
  if (!response.ok) {
    console.error('Failed to fetch products:', response.statusText);
    return;
  }
  const data = await response.json();
  const products = data.products;
  if (!products || !products.length) {
    console.error('No products found.');
    return;
  }

  // Ensure the "womens-dresses" category exists
  const categoryId = await getOrCreateCategory('womens-dresses');

  for (const product of products) {
    console.log(`Migrating product: ${product.title}`);
    
    // Upload the thumbnail and all images
    const thumbnailAsset = await uploadImage(product.thumbnail);
    const imageAssets = [];
    for (const imgUrl of product.images) {
      const asset = await uploadImage(imgUrl);
      if (asset) {
        imageAssets.push(asset);
      }
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
      reviews: product.reviews, // Assumes the reviews structure matches your schema
      returnPolicy: product.returnPolicy,
      minimumOrderQuantity: product.minimumOrderQuantity || 1,
      meta: product.meta,
      images: imageAssets,
      thumbnail: thumbnailAsset,
    };

    try {
      const created = await client.create(doc);
      console.log(`Created product with ID: ${created._id}`);
    } catch (error) {
      console.error(`Error creating product ${product.title}:`, error);
    }
  }
}

migrateProducts()
  .then(() => {
    console.log('Migration complete.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Migration error:', error);
    process.exit(1);
  });

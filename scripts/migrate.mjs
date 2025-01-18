// Import required dependencies
import "dotenv/config";
import { createClient } from "@sanity/client";
import { nanoid } from "nanoid"; // For generating unique _key values

// Configure Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  useCdn: false,
});

// Function to upload image to Sanity
async function uploadImageToSanity(imageUrl) {
  try {
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();

    const asset = await client.assets.upload('image', Buffer.from(buffer), {
      filename: imageUrl.split('/').pop()
    });

    return asset._id;
  } catch (error) {
    console.error(`Failed to upload image ${imageUrl}:`, error);
    return null;
  }
}

// Function to create a slug from title
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Function to create or get category
async function createOrGetCategory(categoryName) {
  try {
    // First, try to find existing category
    const existingCategory = await client.fetch(
      `*[_type == "category" && title == $categoryName][0]`,
      { categoryName }
    );

    if (existingCategory) {
      console.log(`Found existing category: ${categoryName}`);
      return existingCategory._id;
    }

    // If not found, create new category
    const newCategory = await client.create({
      _type: 'category',
      title: categoryName
    });

    console.log(`Created new category: ${categoryName}`);
    return newCategory._id;
  } catch (error) {
    console.error('Error creating/getting category:', error);
    throw error;
  }
}

// Main migration function
async function migrateToSanity() {
  try {
    // First, create or get the furniture category
    console.log('Setting up furniture category...');
    const categoryId = await createOrGetCategory('Furniture');

    const API_URL = "https://dummyjson.com/products/category/furniture";
    const response = await fetch(API_URL);
    const { products } = await response.json();

    for (const product of products) {
      console.log(`Processing product: ${product.title}`);

      // Upload thumbnail
      const thumbnailId = await uploadImageToSanity(product.thumbnail);

      // Upload additional images
      const imageAssets = await Promise.all(
        product.images.map(imageUrl => uploadImageToSanity(imageUrl))
      );

      // Prepare product document
      const sanityProduct = {
        _type: 'product',
        title: product.title,
        slug: {
          _type: 'slug',
          current: createSlug(product.title)
        },
        description: product.description,
        category: {
          _type: 'reference',
          _ref: categoryId  // Use the ID from our created/fetched category
        },
        price: product.price,
        discountPercentage: product.discountPercentage,
        rating: product.rating,
        stock: product.stock,
        tags: ['furniture'],
        brand: product.brand,
        sku: `SKU-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        weight: product.weight || 0,
        dimensions: {
          width: product.dimensions?.width || 0,
          height: product.dimensions?.height || 0,
          depth: product.dimensions?.depth || 0
        },
        warrantyInformation: "Standard 1-year warranty",
        shippingInformation: "Free shipping on orders over $50",
        availabilityStatus: product.stock > 0 ? 'In Stock' : 'Out of Stock',
        reviews: [],
        returnPolicy: "30-day return policy",
        minimumOrderQuantity: 1,
        meta: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          barcode: `BAR${Date.now()}`,
          qrCode: `QR${Date.now()}`
        },
        thumbnail: thumbnailId ? {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: thumbnailId
          }
        } : undefined,
        images: imageAssets.filter(Boolean).map(imageId => ({
          _type: 'image',
          _key: nanoid(), // Generate a unique key for each image
          asset: {
            _type: 'reference',
            _ref: imageId
          }
        }))
      };

      // Create document in Sanity
      const result = await client.create(sanityProduct);
      console.log(`Successfully migrated product: ${product.title} (ID: ${result._id})`);
    }

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    console.error('Error details:', error.message);
  }
}

// Run the migration
migrateToSanity();
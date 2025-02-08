// migrateProducts.mjs
import "dotenv/config";
import { createClient } from "@sanity/client";
import fetch from "node-fetch";
import { nanoid } from "nanoid";

// Configure Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  useCdn: false,
});

// Helper function to upload an image to Sanity
async function uploadImageToSanity(imageUrl) {
  try {
    const res = await fetch(imageUrl);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const asset = await client.assets.upload("image", buffer, {
      filename: imageUrl.split("/").pop(),
    });
    return asset._id;
  } catch (error) {
    console.error("Error uploading image:", imageUrl, error);
    return null;
  }
}

// Helper function to get a category reference from Sanity based on a category slug
async function getCategoryRef(categorySlug) {
  const category = await client.fetch(
    `*[_type=="category" && slug.current == $slug][0]`,
    { slug: categorySlug }
  );
  if (!category) {
    console.warn("Category not found for slug:", categorySlug);
    return null;
  }
  return { _type: "reference", _ref: category._id };
}

async function migrateProducts() {
  try {
    const API_URL = "https://dummyjson.com/products";
    const response = await fetch(API_URL);
    const data = await response.json();
    const products = data.products; // Expecting an object with a "products" array

    for (const product of products) {
      console.log(`Migrating product: ${product.title}`);

      // Upload thumbnail and additional images
      const thumbnailId = await uploadImageToSanity(product.thumbnail);
      const imageIds = [];
      if (product.images && Array.isArray(product.images)) {
        for (const imageUrl of product.images) {
          const assetId = await uploadImageToSanity(imageUrl);
          if (assetId) imageIds.push(assetId);
        }
      }

      // Get the category reference based on product.category (e.g., "beauty")
      const categoryRef = await getCategoryRef(product.category);

      // Prepare the product document for Sanity
      const sanityProduct = {
        _type: "product",
        title: product.title,
        slug: { _type: "slug", current: product.title.toLowerCase().replace(/\s+/g, "-") },
        description: product.description,
        category: categoryRef,
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
        minimumOrderQuantity: product.minimumOrderQuantity,
        meta: product.meta,
        thumbnail: thumbnailId
          ? { _type: "image", asset: { _type: "reference", _ref: thumbnailId } }
          : undefined,
        images: imageIds.map((assetId) => ({
          _type: "image",
          _key: nanoid(),
          asset: { _type: "reference", _ref: assetId },
        })),
      };

      const created = await client.create(sanityProduct);
      console.log(`Created product "${product.title}" with ID ${created._id}`);
    }
    console.log("Product migration completed.");
  } catch (error) {
    console.error("Product migration failed:", error);
  }
}

migrateProducts();

// Import required dependencies
import "dotenv/config";
import { createClient } from "@sanity/client";

// Configure Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  useCdn: false,
});

// (Optional) Function to create a slug from a title if you need to generate one
// In this case, our API is already providing a slug.
function createSlug(title) {
  return String(title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Function to create or get a category using data from the API object
async function createOrGetCategory(categoryData) {
  // Destructure the properties from the API object.
  // For example, categoryData = { slug: "furniture", name: "Furniture", url: "..." }
  const { name, slug, url } = categoryData;
  try {
    // First, try to find an existing category with the same title
    const existingCategory = await client.fetch(
      `*[_type == "category" && title == $title][0]`,
      { title: name }
    );

    if (existingCategory) {
      console.log(`Found existing category: ${name}`);
      return existingCategory._id;
    }

    // If not found, create a new category document in Sanity.
    // Adjust the fields here if your category schema requires additional fields.
    const newCategory = await client.create({
      _type: "category",
      title: name,
      slug: {
        _type: "slug",
        current: slug, // using the API-provided slug
      },
      // If your schema has a field for URL, include it.
      url: url,
    });

    console.log(`Created new category: ${name}`);
    return newCategory._id;
  } catch (error) {
    console.error("Error creating/getting category:", error);
    throw error;
  }
}

// Main migration function for categories
async function migrateCategories() {
  try {
    // API endpoint that returns an array of category objects
    const API_URL = "https://dummyjson.com/products/categories";
    const response = await fetch(API_URL);
    const data = await response.json();

    // The API returns an array of objects
    // Example: [{ "slug": "beauty", "name": "Beauty", "url": "https://dummyjson.com/products/category/beauty" }, ...]
    const categories = data;

    console.log(`Found ${categories.length} categories from API.`);

    // Loop over each category object and create or get it in Sanity
    for (const categoryData of categories) {
      await createOrGetCategory(categoryData);
    }

    console.log("Category migration completed successfully!");
  } catch (error) {
    console.error("Category migration failed:", error);
    console.error("Error details:", error.message);
  }
}

// Run the migration
migrateCategories();

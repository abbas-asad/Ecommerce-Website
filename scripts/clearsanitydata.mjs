// Import environment variables from .env.local
import "dotenv/config";
import { createClient } from "@sanity/client";

const {
    NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_TOKEN,
    NEXT_PUBLIC_SANITY_API_VERSION
} = process.env;

// Validate environment variables
if (!NEXT_PUBLIC_SANITY_PROJECT_ID || !NEXT_PUBLIC_SANITY_TOKEN) {
    console.error("Missing required environment variables. Please check your .env.local file.");
    process.exit(1);
}

// Create Sanity client
const client = createClient({
    projectId: NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: NEXT_PUBLIC_SANITY_DATASET || "production",
    useCdn: false,
    apiVersion: NEXT_PUBLIC_SANITY_API_VERSION,
    token: NEXT_PUBLIC_SANITY_TOKEN,
});

async function clearSanityData() {
    console.log("Starting Sanity cleanup...");

    try {
        // Delete all products
        const deleteProducts = await client.delete({
            query: '*[_type == "product"]'
        });
        console.log(`Deleted ${deleteProducts.results.length} products`);

        // Delete all categories
        const deleteCategories = await client.delete({
            query: '*[_type == "category"]'
        });
        console.log(`Deleted ${deleteCategories.results.length} categories`);

        // Delete all unused assets (images)
        const deleteAssets = await client.delete({
            query: '*[_type == "sanity.imageAsset"]'
        });
        console.log(`Deleted ${deleteAssets.results.length} image assets`);

        console.log("Sanity cleanup completed successfully!");
    } catch (error) {
        console.error("Error during cleanup:", error.message);
        process.exit(1);
    }
}

// Run the cleanup
clearSanityData();
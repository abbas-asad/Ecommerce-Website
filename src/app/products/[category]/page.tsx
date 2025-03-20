import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ecommerceConfig from "@ecommerce.config";

// Fetch products for a given category
async function getCategoryProducts(category: string) {
    try {
        const query = `*[_type == "product" && category->slug.current == $category]{
      _id,
      title,
      "slug": slug.current,
      price,
      discountPercentage,
      rating,
      stock,
      "category": category->title,
      "category": category->slug.current,
      "thumbnail": thumbnail.asset->url
    }`;
        const products = await client.fetch(query, { category });
        if (!products || products.length === 0) {
            console.log(`No products found for category: ${category}`);
            return null;
        }
        return products;
    } catch (error) {
        console.error("Error fetching category products:", error);
        return null;
    }
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
    console.log(`Fetching products for category slug: ${params.category}`);
    const products = await getCategoryProducts(params.category);
    if (!products) {
        console.log("Category not found, returning 404");
        notFound();
    }
    return (
        <section className="container mx-auto py-10">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 capitalize">
                {products[0]?.category.replace(/-/g, " ")}
            </h1>

            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
                Browse all available products in this category.
            </p>

            <div className="min-h-screen flex flex-col">
                <main className="flex-grow">
                    <div className="container mx-auto px-4 py-8 space-y-12">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {products.map((product: any) => (
                                <Link key={product._id} href={`/products/${product.category}/${product.slug}`}>
                                    <div className="group relative bg-white dark:bg-gray-800 rounded-lg border overflow-hidden transition-all hover:shadow-lg">
                                        <div className="relative aspect-square overflow-hidden">
                                            <Image
                                                src={product.thumbnail || "/placeholder.svg"}
                                                alt={product.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                {/* Optionally add action buttons here */}
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-medium text-base line-clamp-1 mb-1 group-hover:text-primary transition-colors">
                                                {product.title}
                                            </h3>
                                            <div className="flex items-center gap-1 mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-5 w-5 ${i < Math.floor(product.rating)
                                                                ? "text-yellow-400 fill-yellow-400"
                                                                : i < product.rating
                                                                    ? "text-yellow-400 fill-yellow-400 opacity-50"
                                                                    : "text-gray-300"
                                                            }`}
                                                    />
                                                ))}
                                                <span className="text-xs text-muted-foreground ml-1">({product.stock})</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-lg">
                                                    {ecommerceConfig.currency.prefix}
                                                    {product.price.toFixed(2)}
                                                </span>
                                                {product.discountPercentage && (
                                                    <span className="text-sm text-muted-foreground line-through">
                                                        {ecommerceConfig.currency.prefix}
                                                        {(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </section>
    );
}

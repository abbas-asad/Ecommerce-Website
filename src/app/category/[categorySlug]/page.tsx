import { client } from "@/sanity/lib/client";
import ProductCard from "@/app/components/productcardcat"; // Make sure you have this component
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: {
    categorySlug: string;
  };
}

export default async function CategoryPage({ params: { categorySlug } }: CategoryPageProps) {
  // Query to fetch the category document by its slug
  const categoryQuery = `
    *[_type == "category" && slug.current == $slug][0]{
      _id,
      title
    }
  `;
  const category = await client.fetch(categoryQuery, { slug: categorySlug });

  if (!category) {
    return notFound();
  }

  // Query to fetch products that reference this category.
  // We use the reference join (category->slug.current) to filter products by category slug.
  const productsQuery = `
     *[_type == "product" && category->slug.current == $slug]{
    _id,
    title,
    slug,
    price,
    "thumbnail": thumbnail.asset->url  // This projects a URL string
  }
  `;
  const products = await client.fetch(productsQuery, { slug: categorySlug });

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{category.title}</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p>No products found in this category.</p>
      )}
    </main>
  );
}

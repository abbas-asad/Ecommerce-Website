import { client } from "@/sanity/lib/client"
import ProductCard from "@/app/components/search-product-cards"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface SearchPageProps {
  searchParams: { q: string }
}

interface Product {
  _id: string
  title: string
  slug: { current: string }
  price: number
  images: { asset: { url: string } }[]
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q

  if (!query) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Search Results</h1>
        <p>Please enter a search query.</p>
      </div>
    )
  }

  const products = await client.fetch<Product[]>(`
    *[_type == "product" && title match "*${query}*"] {
      _id,
      title,
      slug,
      price,
      "images": images[]{
        asset->{
          url
        }
      }
    }
  `)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Search Results for &quot;{query}&quot;</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div>
          <p>No products found for &quot;{query}&quot;.</p>
          <Link href="/shop">
            <Button className="mt-4">Browse all products</Button>
          </Link>
        </div>
      )}
    </div>
  )
}


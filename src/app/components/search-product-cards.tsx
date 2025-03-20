import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ecommerceConfig from "@ecommerce.config"
import { Product } from "../studio/sanity.types"

// interface Product {
//   _id: string
//   title: string
//   slug: { current: string }
//   price: number
//   images: { asset: { url: string } }[]
//   rating?: number
//   thumbnail?: string
//   categorySlug:string
// }

export default function ProductCard({ product }: { product: any }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <Link href={`/products/${product.category}/${product.slug.current}`}>
        <div className="cursor-pointer">
          <div className="aspect-square relative overflow-hidden">
            <Image
              src={product.images[0]?.asset.url || "/placeholder.png"}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.title}</h3>
            <p className="font-bold text-xl text-primary mb-2">
              {ecommerceConfig.currency.prefix}
              {product.price.toFixed(2)}
            </p>
            {product.rating && (
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm text-gray-600">{product.rating.toFixed(1)}</span>
              </div>
            )}
            {/* <Link href={`/products/${product.slug.current}`} className="mt-4 inline-block w-full">
              <Button className="w-full bg-primary hover:bg-primary-dark transition-colors duration-300">
                View Details
              </Button>
            </Link> */}
          </div>
        </div>
      </Link>
    </div>
  )
}
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Product {
  _id: string
  title: string
  slug: { current: string }
  price: number
  images: { asset: { url: string } }[]
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <Image
        src={product.images[0]?.asset.url || "/placeholder.png"}
        alt={product.title}
        width={300}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
        <p className="text-gray-600 mb-4">Rs. {product.price.toFixed(2)}</p>
        <Link href={`/products/${product.slug.current}`}>
          <Button className="w-full">View Details</Button>
        </Link>
      </div>
    </div>
  )
}


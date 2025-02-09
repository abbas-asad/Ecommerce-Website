"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { client } from "@/sanity/lib/client"
import type { Product as IProduct } from "../studio/sanity.types"
import ecommerceConfig from "@ecommerce.config"
import { Loader2 } from "lucide-react"
import Pagination from "./pagination" // import our pagination component

interface ProductcardsProps {
  headingName: string
  para?: string
  limit?: number
  /**
   * Set to false if you do not want to show the pagination controls.
   * Defaults to true.
   */
  showPagination?: boolean
}

export default function Productcards({
  headingName,
  para,
  limit,
  showPagination = true,
}: ProductcardsProps) {
  // currentPage, pageSize, products, loading, and total count state
  const [productData, setProductData] = useState<IProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = limit || 8
  const [totalProducts, setTotalProducts] = useState(0)

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      // Get total count so we know how many pages are available
      const total = await client.fetch(`count(*[_type == "product"])`)
      setTotalProducts(total)

      // Calculate the offset for the current page.
      const skip = (currentPage - 1) * pageSize

      // Use GROQ slicing to fetch only the current page’s products.
      const query = `
        *[_type == "product"][${skip}...${skip + pageSize}]{
          _id,
          title,
          price,
          "thumbnail": thumbnail.asset->url,
          rating,
          slug
        }
      `
      const data = await client.fetch(query)
      setProductData(data)
      setIsLoading(false)
    }

    fetchProducts()
  }, [currentPage, pageSize])

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">{headingName}</h2>
          {para && <p className="text-gray-600 max-w-2xl mx-auto">{para}</p>}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {productData.map((product: IProduct) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg"
                >
                  <Link href={`/products/${product.slug.current}`}>
                    <div className="cursor-pointer">
                      <div className="aspect-square relative overflow-hidden">
                        <Image
                          src={product.thumbnail || "/placeholder.svg"}
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
                          <span className="ml-2 text-sm text-gray-600">
                            {product.rating?.toFixed(1) || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            {/* Conditionally render Pagination Controls */}
            {showPagination && (
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(totalProducts / pageSize)}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
    </section>
  )
}

"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { client } from "@/sanity/lib/client"
import type { Product as IProduct } from "../studio/sanity.types"
import ecommerceConfig from "@ecommerce.config"
import { Star, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProductCardsProps {
  title: string
  subtitle: string
  queryCondition: string; // This will be different for each section
  limit?: number
  scrollable?: boolean
}

export default function ProductCards({
  title,
  subtitle,
  queryCondition,
  limit = 200,
  scrollable = false,
}: ProductCardsProps) {
  const [products, setProducts] = useState<IProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      const query =
        `*[_type == "product" && ${queryCondition}][0...${limit}]{
          _id,
          title,
          price,
          "thumbnail": thumbnail.asset->url,
          "category": category->title,
          "categorySlug": category->slug.current,
          rating,
          slug,
          discountPercentage,
          stock
        }`
      const data = await client.fetch(query)
      setProducts(data)
      setIsLoading(false)
    }

    fetchProducts()
  }, [limit])

  // Scroll handling logic
  useEffect(() => {
    if (!scrollContainerRef.current || !scrollable) return

    const checkScroll = () => {
      const container = scrollContainerRef.current
      if (!container) return

      setShowLeftArrow(container.scrollLeft > 20)
      setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth - 20)
    }

    const container = scrollContainerRef.current
    container.addEventListener("scroll", checkScroll)
    checkScroll()

    return () => container.removeEventListener("scroll", checkScroll)
  }, [scrollable])

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const scrollAmount = container.clientWidth * 0.8
    const scrollPosition = container.scrollLeft
    const maxScrollPosition = container.scrollWidth - container.clientWidth

    if (direction === "left") {
      container.scrollTo({
        left: Math.max(0, scrollPosition - scrollAmount),
        behavior: "smooth",
      })
    } else {
      container.scrollTo({
        left: Math.min(maxScrollPosition, scrollPosition + scrollAmount),
        behavior: "smooth",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <section className="py-10 relative">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      <div className="relative">
        {/* {scrollable && showLeftArrow && ( */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md hidden md:flex items-center justify-center hover:bg-white transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        {/* )} */}

        {/* {scrollable && showRightArrow && ( */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md hidden md:flex items-center justify-center hover:bg-white transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        {/* // )} */}

        <div
          ref={scrollContainerRef}
          className={`${scrollable
            ? "flex overflow-x-auto pb-4 hide-scrollbar md:px-8"
            : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
            }`}
          style={{ scrollbarWidth: "none" }}
        >
          {products.map((product) => (
            <div
              key={product._id}
              className={`${scrollable ? "flex-none w-[160px] sm:w-[200px] md:w-[280px] mr-4 md:mr-6" : ""}`}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {!scrollable && (
        <div className="flex justify-center mt-10">
          <Button variant="outline" size="lg">
            View All Products
          </Button>
        </div>
      )}
    </section>
  )
}

// ProductCard component remains the same as in your second file

function ProductCard({ product }: { product: IProduct }) {
  return (
    <div className="group relative bg-white rounded-lg border overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/products/${product.categorySlug}/${product.slug.current}`}>
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.thumbnail || "/placeholder.svg"}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* </Link> */}

          {product.discountPercentage && (
            <Badge className="absolute top-3 left-3 bg-red-500 px-2 py-1 text-xs font-semibold">
              -{product.discountPercentage}%
            </Badge>
          )}

          {/* {product.isNew && (
            <Badge className="absolute top-3 left-3 bg-green-500 px-2 py-1 text-xs font-semibold">New</Badge>
          )} */}

          {product.stock && product.stock < 10 && (
            <Badge className="absolute top-3 right-3 bg-amber-500 px-2 py-1 text-xs font-semibold">
              Only {product.stock} left
            </Badge>
          )}

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>

          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Keep action buttons */}
            {/* ... */}
          </div>

          {/* <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button className="w-full gap-2">
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </div> */}
        </div>

        <div className="p-4">
          <h3 className="font-medium text-base line-clamp-1 mb-1 group-hover:text-primary transition-colors">
            {product.title}
          </h3>

          <div className="flex items-center gap-1 mb-2">
            {/* {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${i < (product.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                />
              ))} */}
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
      </Link>
    </div>
  )
}
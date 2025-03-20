import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const categories = [
  { id: 1, name: "Electronics", image: "/placeholder.svg?height=200&width=200", count: 120 },
  { id: 2, name: "Fashion", image: "/placeholder.svg?height=200&width=200", count: 350 },
  { id: 3, name: "Home Decor", image: "/placeholder.svg?height=200&width=200", count: 210 },
  { id: 4, name: "Beauty", image: "/placeholder.svg?height=200&width=200", count: 180 },
  { id: 5, name: "Sports", image: "/placeholder.svg?height=200&width=200", count: 95 },
  { id: 6, name: "Books", image: "/placeholder.svg?height=200&width=200", count: 275 },
]


const ProductCategories = () => {
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900">
    <div className="container mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">
        Explore by Category
      </h2>
      <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-12">
        Discover top categories and find what you love
      </p>
  
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link href={`/category/${category.id}`} key={category.id} className="group">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <div className="relative h-48 w-full">
                <Image
                  src={'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop'}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {category.count} Products
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
  
      {/* View All Button */}
      <div className="text-center mt-12">
        <Link href="/categories">
          <button className="px-6 py-3 text-white bg-black dark:bg-white dark:text-black rounded-full text-lg font-medium transition hover:bg-gray-800 dark:hover:bg-gray-200">
            View All Categories
          </button>
        </Link>
      </div>
    </div>
  </section>
  )
}

export default ProductCategories

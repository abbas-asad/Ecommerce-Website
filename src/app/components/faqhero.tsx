"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface FAQHeroProps {
  onSearch: (term: string) => void
}

export function FAQHero({ onSearch }: FAQHeroProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  return (
    <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-center sm:text-5xl lg:text-6xl">
          How can we help you?
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-xl text-center">
          Find answers to frequently asked questions about our products, shipping, returns, and more.
        </p>
        <form onSubmit={handleSearch} className="mt-8 max-w-xl mx-auto">
          <div className="flex items-center">
            <Input
              type="search"
              placeholder="Search our FAQ..."
              className="flex-grow bg-white text-gray-900 placeholder-gray-500 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-lg">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}


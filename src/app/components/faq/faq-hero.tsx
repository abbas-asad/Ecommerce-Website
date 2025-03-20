"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import Image from "next/image"

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
    <section className="relative w-full h-[450px] sm:h-[500px] lg:h-[600px] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/faq.avif"
          alt="FAQ Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" /> {/* Overlay */}
      </div>

      {/* Content */}
      <div className="relative text-center text-white px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
        How can we help you?
        </h1>
        <p className="mt-4 text-lg sm:text-xl max-w-2xl mx-auto">
          Browse our FAQs or search for answers to your questions about orders, shipping, and more.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mt-6 max-w-lg mx-auto">
          <div className="flex bg-white shadow-md rounded-lg overflow-hidden outline-none">
            <Input
              type="search"
              placeholder="Search FAQs..."
              className="flex-grow border-0 focus:ring-0 px-4 py-3 text-gray-900"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" className="bg-white text-black hover:bg-white hover:text-black px-5">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}

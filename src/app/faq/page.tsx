"use client"

import { useState } from "react"
import { FAQ } from "@/app/components/faq/faqs"
import { FAQHero } from "@/app/components/faq/faq-hero"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FAQPage() {
    const [searchTerm, setSearchTerm] = useState("")
  
    const handleSearch = (term: string) => {
      setSearchTerm(term)
    }
  

  return (
    <div>
    <FAQHero onSearch={handleSearch} />
    <div className="container mx-auto px-2">
      <FAQ searchTerm={searchTerm} />
      {/* <div className="text-center mt-12 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Couldn&apos;t find an answer to your question?</h2>
        <Button asChild>
          <Link href="/contact">Contact Our Support Team</Link>
        </Button>
      </div> */}
    </div>
  </div>
  )
}


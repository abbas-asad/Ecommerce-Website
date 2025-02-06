"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { User, ShoppingCart, Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import siteConfig from "@site.config"
import { useCart } from "@/context/cart-context"
import { useRouter } from "next/navigation"
import { client } from "@/sanity/lib/client"
import { v4 as uuidv4 } from 'uuid'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Account", href: "/account" },
  { name: "Contact", href: "/contact" },
]

interface Product {
  _id: string
  title: string
  slug: {
    current: string
  }
}

export default function Navbar() {
  const [userId, setUserId] = useState<string>("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const { items: cartItems } = useCart()
  const router = useRouter()

  useEffect(() => {
    // Handle localStorage after component mounts
    const storedUserId = window.localStorage.getItem('userId')
    const newUserId = storedUserId || uuidv4()
    if (!storedUserId) {
      window.localStorage.setItem('userId', newUserId)
    }
    setUserId(newUserId)
  }, [])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        performSearch()
      } else {
        setSearchResults([])
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  const performSearch = async () => {
    const query = `*[_type == "product" && title match "${searchQuery}*"] {
      _id,
      title,
      slug
    }`
    const results = await client.fetch(query)
    setSearchResults(results)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setIsSearchOpen(false)
    }
  }

  return (
    <nav className="bg-white py-4 shadow-sm sticky top-0 z-30">
      {/* Rest of your navbar JSX remains the same */}
      <div className="container mx-auto px-medium lg:px-large">
        <div className="flex items-center justify-between h-12">
          <Link href="/" className="text-xl font-semibold text-gray-900">
            {siteConfig.name}
          </Link>

          <ul className="hidden md:flex space-x-8 font-medium text-gray-800">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="hover:text-black hover:underline transition-colors">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Search size={20} className="text-gray-700" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="w-full">
                <SheetHeader>
                  <SheetTitle>Search Products</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <form className="flex gap-2" onSubmit={handleSearchSubmit}>
                    <Input
                      placeholder="Search for furniture, decor and more..."
                      className="flex-1"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button type="submit">Search</Button>
                  </form>
                  {searchResults.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {searchResults.map((product) => (
                        <Link
                          key={product._id}
                          href={`/products/${product.slug.current}`}
                          className="block p-2 hover:bg-gray-100 rounded"
                          onClick={() => setIsSearchOpen(false)}
                        >
                          {product.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <User size={20} className="text-gray-700" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/profile" className="w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={`/orders/${userId}`} className="w-full">
                    Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/wishlist" className="w-full">
                    Wishlist
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/logout" className="w-full">
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <div className="relative">
                  <ShoppingCart size={20} className="text-gray-700" />
                  <span
                    className={`absolute -top-2 -right-2 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center ${
                      cartItems.length > 0 ? 'bg-[#A47E2A]' : 'hidden'
                    }`}
                  >
                    {cartItems.length}
                  </span>
                </div>
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu size={20} className="text-gray-700" />
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t">
            <ul className="flex flex-col space-y-4 font-medium text-gray-800">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="block hover:text-black transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}
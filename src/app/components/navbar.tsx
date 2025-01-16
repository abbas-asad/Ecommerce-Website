"use client"
import { useState } from 'react'
import Link from 'next/link'
import { User, ShoppingCart, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from '@/components/ui/sheet'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'Account', href: '/account' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <nav className="bg-white py-4 shadow-sm sticky top-0 z-30">
      <div className="container mx-auto px-medium lg:px-large">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-semibold text-gray-900"
          >
            Luxemart
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8 font-medium text-gray-800">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="hover:text-black hover:underline transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Action Icons */}
          <div className="flex items-center gap-2">
            {/* Search */}
            {/* <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                >
                  <Search size={20} className="text-gray-700" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="w-full">
                <SheetHeader>
                  <SheetTitle>Search Products</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                    <Input
                      placeholder="Search for furniture, decor and more..."
                      className="flex-1"
                    />
                    <Button type="submit">Search</Button>
                  </form>
                </div>
              </SheetContent>
            </Sheet> */}

            {/* Account Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                >
                  <User size={20} className="text-gray-700" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/profile" className="w-full">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/orders" className="w-full">Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/wishlist" className="w-full">Wishlist</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/logout" className="w-full">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                >
                  <div className="relative">
                    <ShoppingCart size={20} className="text-gray-700" />
                    <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      2
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72">
                <DropdownMenuLabel>Shopping Cart</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Trenton modular sofa</p>
                        <p className="text-sm text-gray-500">1 × Rs. 25,000.00</p>
                      </div>
                      <Button variant="ghost" size="sm">×</Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Plain console</p>
                        <p className="text-sm text-gray-500">1 × Rs. 25,000.00</p>
                      </div>
                      <Button variant="ghost" size="sm">×</Button>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="my-4" />
                  <div className="flex justify-between font-medium mb-4">
                    <span>Subtotal:</span>
                    <span>Rs. 50,000.00</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link href="/cart">
                      <Button className="w-full" variant="outline">View Cart</Button>
                    </Link>
                    <Link href="/checkout">
                      <Button className="w-full bg-black hover:bg-gray-800">Checkout</Button>
                    </Link>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
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

        {/* Mobile Navigation Menu */}
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


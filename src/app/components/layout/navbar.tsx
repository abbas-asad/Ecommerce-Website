"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  ShoppingCart,
  Heart,
  Menu,
  X,
  ListOrdered,
  ShoppingBag,
} from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import siteConfig from "@site.config";
import { useCart } from "@/context/cart-context";
import { v4 as uuidv4 } from "uuid"


// interface NavbarProps {
//   categories: {
//     id: number;
//     name: string;
//     image: string;
//     count: number;
//   }[];
// }

export default function Navbar() {

  const [userId, setUserId] = useState<string>("")
  const { items: cartItems } = useCart()

  useEffect(() => {
    // Handle localStorage after component mounts
    const storedUserId = window.localStorage.getItem("userId")
    const newUserId = storedUserId || uuidv4()
    if (!storedUserId) {
      window.localStorage.setItem("userId", newUserId)
    }
    setUserId(newUserId)
  }, [])


  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "w-full py-4 transition-all duration-300 z-50 sticky top-0",
        isScrolled ? "bg-white shadow-md dark:bg-gray-900" : "bg-white dark:bg-gray-900"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary">
            {siteConfig.name}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="font-medium hover:text-primary">
              Home
            </Link>
            <Link href="/shop" className="font-medium hover:text-primary">
              Shop
            </Link>
            {/* Commented out categories dropdown
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="font-medium hover:text-primary">Categories</button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {categories.map((category) => (
                  <DropdownMenuItem key={category.id}>
                    <Link href={`/category/${category.id}`} className="w-full">
                      {category.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu> */}
            <Link href="/contact" className="font-medium hover:text-primary">
              Contact
            </Link>
            <Link href="/faq" className="font-medium hover:text-primary">
              FAQ
            </Link>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center relative w-1/4">
            <Input
              type="text"
              placeholder="Search products..."
              className="pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Search className="h-4 w-4 text-muted-foreground" />
            </button>
          </form>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-2">
              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="ghost">Login/Register</Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
            <Link href={`/orders/${userId}`}>
              <button className="relative p-2 hover:bg-muted rounded-full">
                <ShoppingBag className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
              </button>
            </Link>
            <Link href="/cart">
              <button className="relative p-2 hover:bg-muted rounded-full">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
              </button>
            </Link>
            <button
              className="md:hidden p-2 hover:bg-muted rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t">
            <form onSubmit={handleSearch} className="flex items-center relative mb-4">
              <Input
                type="text"
                placeholder="Search products..."
                className="pr-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="h-4 w-4 text-muted-foreground" />
              </button>
            </form>
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="font-medium hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/shop" className="font-medium hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                Shop
              </Link>
              {/* Commented out categories list
              <div className="pl-4 space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.id}`}
                    className="block text-sm hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div> */}
              <Link href="/contact" className="font-medium hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
              <Link href="/faq" className="font-medium hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                FAQ
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
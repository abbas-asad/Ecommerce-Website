// "use client"

// import { useState, useEffect } from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import {
//   Search,
//   ShoppingCart,
//   Heart,
//   User,
//   Menu,
//   X,
//   ChevronRight,
//   ChevronLeft,
//   Star,
//   Clock,
//   Facebook,
//   Instagram,
//   Twitter,
//   Linkedin,
// } from "lucide-react"
// import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
// import HeroSection from "./components/hero"

// // Mock data for the website
// const categories = [
//   { id: 1, name: "Electronics", image: "/placeholder.svg?height=200&width=200", count: 120 },
//   { id: 2, name: "Fashion", image: "/placeholder.svg?height=200&width=200", count: 350 },
//   { id: 3, name: "Home Decor", image: "/placeholder.svg?height=200&width=200", count: 210 },
//   { id: 4, name: "Beauty", image: "/placeholder.svg?height=200&width=200", count: 180 },
//   { id: 5, name: "Sports", image: "/placeholder.svg?height=200&width=200", count: 95 },
//   { id: 6, name: "Books", image: "/placeholder.svg?height=200&width=200", count: 275 },
// ]

// const products = [
//   {
//     id: 1,
//     name: "Wireless Headphones",
//     price: 129.99,
//     discountPrice: 99.99,
//     rating: 4.5,
//     image: "/placeholder.svg?height=300&width=300",
//     category: "Electronics",
//     featured: true,
//     trending: true,
//   },
//   {
//     id: 2,
//     name: "Smart Watch",
//     price: 199.99,
//     discountPrice: 149.99,
//     rating: 4.2,
//     image: "/placeholder.svg?height=300&width=300",
//     category: "Electronics",
//     featured: true,
//     trending: false,
//   },
//   {
//     id: 3,
//     name: "Designer Handbag",
//     price: 299.99,
//     discountPrice: null,
//     rating: 4.8,
//     image: "/placeholder.svg?height=300&width=300",
//     category: "Fashion",
//     featured: true,
//     trending: true,
//   },
//   {
//     id: 4,
//     name: "Modern Coffee Table",
//     price: 249.99,
//     discountPrice: 199.99,
//     rating: 4.0,
//     image: "/placeholder.svg?height=300&width=300",
//     category: "Home Decor",
//     featured: true,
//     trending: false,
//   },
//   {
//     id: 5,
//     name: "Premium Skincare Set",
//     price: 89.99,
//     discountPrice: 69.99,
//     rating: 4.7,
//     image: "/placeholder.svg?height=300&width=300",
//     category: "Beauty",
//     featured: true,
//     trending: true,
//   },
//   {
//     id: 6,
//     name: "Fitness Tracker",
//     price: 79.99,
//     discountPrice: null,
//     rating: 4.3,
//     image: "/placeholder.svg?height=300&width=300",
//     category: "Sports",
//     featured: true,
//     trending: false,
//   },
//   {
//     id: 7,
//     name: "Bestselling Novel",
//     price: 24.99,
//     discountPrice: 19.99,
//     rating: 4.6,
//     image: "/placeholder.svg?height=300&width=300",
//     category: "Books",
//     featured: true,
//     trending: true,
//   },
//   {
//     id: 8,
//     name: "Wireless Earbuds",
//     price: 89.99,
//     discountPrice: 69.99,
//     rating: 4.4,
//     image: "/placeholder.svg?height=300&width=300",
//     category: "Electronics",
//     featured: true,
//     trending: true,
//   },
// ]

// const sliderImages = [
//   {
//     id: 1,
//     image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=2071&auto=format&fit=crop",
//     title: "Summer Collection",
//     subtitle: "Discover the latest trends for the season",
//     cta: "Shop Now",
//   },
//   {
//     id: 2,
//     image: "/placeholder.svg?height=600&width=1600",
//     title: "Tech Gadgets",
//     subtitle: "Upgrade your tech with our latest arrivals",
//     cta: "Explore",
//   },
//   {
//     id: 3,
//     image: "/placeholder.svg?height=600&width=1600",
//     title: "Home Makeover",
//     subtitle: "Transform your space with our home decor collection",
//     cta: "View Collection",
//   },
// ]

// const paymentMethods = [
//   { id: 1, name: "Visa", image: "/placeholder.svg?height=50&width=80" },
//   { id: 2, name: "MasterCard", image: "/placeholder.svg?height=50&width=80" },
//   { id: 3, name: "PayPal", image: "/placeholder.svg?height=50&width=80" },
//   { id: 4, name: "Apple Pay", image: "/placeholder.svg?height=50&width=80" },
//   { id: 5, name: "Google Pay", image: "/placeholder.svg?height=50&width=80" },
// ]

// const testimonials = [
//   {
//     id: 1,
//     name: "Sarah Johnson",
//     role: "Regular Customer",
//     content:
//       "I've been shopping here for years and the quality never disappoints. The customer service is exceptional!",
//     rating: 5,
//   },
//   {
//     id: 2,
//     name: "Michael Chen",
//     role: "New Customer",
//     content:
//       "First time ordering and I'm impressed with the fast shipping and product quality. Will definitely shop again!",
//     rating: 4,
//   },
//   {
//     id: 3,
//     name: "Emma Williams",
//     role: "Loyal Customer",
//     content: "The variety of products is amazing and the website is so easy to navigate. My go-to online store!",
//     rating: 5,
//   },
// ]

// const blogPosts = [
//   {
//     id: 1,
//     title: "Top 10 Summer Fashion Trends",
//     excerpt: "Discover the hottest fashion trends for this summer season...",
//     image: "/placeholder.svg?height=200&width=350",
//     date: "June 15, 2023",
//   },
//   {
//     id: 2,
//     title: "How to Choose the Perfect Headphones",
//     excerpt: "A comprehensive guide to finding headphones that match your needs...",
//     image: "/placeholder.svg?height=200&width=350",
//     date: "May 28, 2023",
//   },
//   {
//     id: 3,
//     title: "Home Office Setup Essentials",
//     excerpt: "Create a productive workspace with these essential items...",
//     image: "/placeholder.svg?height=200&width=350",
//     date: "April 10, 2023",
//   },
// ]

// export default function Home() {
//   const [currentSlide, setCurrentSlide] = useState(0)
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
//   const [cartCount, setCartCount] = useState(0)
//   const [wishlistCount, setWishlistCount] = useState(0)
//   const [isScrolled, setIsScrolled] = useState(false)

//   // Handle slider navigation
//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1))
//   }

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1))
//   }

//   // Auto-advance slider
//   useEffect(() => {
//     const interval = setInterval(() => {
//       nextSlide()
//     }, 5000)
//     return () => clearInterval(interval)
//   }, [currentSlide])

//   // Detect scroll for sticky navbar
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setIsScrolled(true)
//       } else {
//         setIsScrolled(false)
//       }
//     }

//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   // Add to cart function
//   // const addToCart = (productId) => {
//   //   setCartCount((prev) => prev + 1)
//   //   // In a real app, you would add the product to the cart state/context
//   // }

//   // // Add to wishlist function
//   // const addToWishlist = (productId) => {
//   //   setWishlistCount((prev) => prev + 1)
//   //   // In a real app, you would add the product to the wishlist state/context
//   // }

//   return (
//     <main className="min-h-screen">
//       {/* Navbar */}
//       <header
//         className={cn(
//           "w-full py-4 transition-all duration-300 z-50 sticky top-0",
//           isScrolled ? "bg-white shadow-md dark:bg-gray-900" : "bg-white dark:bg-gray-900",
//         )}
//       >
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-between">
//             {/* Logo */}
//             <div className="flex items-center">
//               <Link href="/" className="text-2xl font-bold text-primary">
//                 ShopHub
//               </Link>
//             </div>

//             {/* Desktop Navigation */}
//             <nav className="hidden md:flex items-center space-x-8">
//               <Link href="/" className="font-medium hover:text-primary">
//                 Home
//               </Link>
//               <Link href="/shop" className="font-medium hover:text-primary">
//                 Shop
//               </Link>
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <button className="font-medium hover:text-primary">Categories</button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent>
//                   {categories.map((category) => (
//                     <DropdownMenuItem key={category.id}>
//                       <Link href={`/category/${category.id}`} className="w-full">
//                         {category.name}
//                       </Link>
//                     </DropdownMenuItem>
//                   ))}
//                 </DropdownMenuContent>
//               </DropdownMenu>
//               <Link href="/contact" className="font-medium hover:text-primary">
//                 Contact
//               </Link>
//               <Link href="/faq" className="font-medium hover:text-primary">
//                 FAQ
//               </Link>
//             </nav>

//             {/* Search Bar */}
//             <div className="hidden md:flex items-center relative w-1/4">
//               <Input type="text" placeholder="Search products..." className="pr-10" />
//               <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//             </div>

//             {/* User Actions */}
//             <div className="flex items-center space-x-4">
//               <button className="relative p-2 hover:bg-muted rounded-full">
//                 {/* <User className="h-5 w-5" /> */}
//                  <SignedOut>
//                     <button className="text-sm font-medium text-gray-700 hover:text-gray-900">
//                       <SignInButton mode="modal">
//                         Login / Register
//                       </SignInButton>
//                     </button>
//                   </SignedOut>
//                   <SignedIn>
//                     <UserButton />
//                   </SignedIn>
//               </button>
//               <button className="relative p-2 hover:bg-muted rounded-full">
//                 <Heart className="h-5 w-5" />
//                 {wishlistCount > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                     {wishlistCount}
//                   </span>
//                 )}
//               </button>
//               <button className="relative p-2 hover:bg-muted rounded-full">
//                 <ShoppingCart className="h-5 w-5" />
//                 {cartCount > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                     {cartCount}
//                   </span>
//                 )}
//               </button>
//               <button
//                 className="md:hidden p-2 hover:bg-muted rounded-full"
//                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               >
//                 {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//               </button>
//             </div>
//           </div>

//           {/* Mobile Menu */}
//           {mobileMenuOpen && (
//             <div className="md:hidden mt-4 py-4 border-t">
//               <div className="flex items-center relative mb-4">
//                 <Input type="text" placeholder="Search products..." className="pr-10" />
//                 <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               </div>
//               <nav className="flex flex-col space-y-4">
//                 <Link href="/" className="font-medium hover:text-primary">
//                   Home
//                 </Link>
//                 <Link href="/shop" className="font-medium hover:text-primary">
//                   Shop
//                 </Link>
//                 <button className="font-medium hover:text-primary text-left">Categories</button>
//                 <div className="pl-4 space-y-2">
//                   {categories.map((category) => (
//                     <Link
//                       key={category.id}
//                       href={`/category/${category.id}`}
//                       className="block text-sm hover:text-primary"
//                     >
//                       {category.name}
//                     </Link>
//                   ))}
//                 </div>
//                 <Link href="/contact" className="font-medium hover:text-primary">
//                   Contact
//                 </Link>
//                 <Link href="/faq" className="font-medium hover:text-primary">
//                   FAQ
//                 </Link>
//               </nav>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* Hero Slider */}
     

//       <HeroSection />

//     {/* Categories Section */}


// ✅ Featured Products
// ✅ Limited-Time Deals
// ✅ Best Sellers
// ✅ New Arrivals 
// ✅ Trending
// ✅ Recommended 



// {/*  "Why Choose Us?" */}
// {/* <>
//   <Navbar /> comp
//   <HeroSlider /> comp
//   <ProductCategories />  comp
//   // <FeaturedProducts />
//   // <LimitedTimeDeals />
//   <WhyChooseUs /> comp
//   <GlobalPartners /> comp
//   <Footer /> comp✅
// </> */}


//       {/* Featured Products */}
//       {/* <section className="py-16">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-4">Featured Products</h2>
//           <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
//             Discover our handpicked selection of top products across all categories
//           </p>

//           <Tabs defaultValue="all" className="w-full mb-8">
//             <TabsList className="mx-auto flex justify-center">
//               <TabsTrigger value="all">All</TabsTrigger>
//               <TabsTrigger value="trending">Trending</TabsTrigger>
//               <TabsTrigger value="featured">Featured</TabsTrigger>
//               <TabsTrigger value="new">New Arrivals</TabsTrigger>
//             </TabsList>

//             <TabsContent value="all" className="mt-8">
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {products.map((product) => (
//                   <ProductCard
//                     key={product.id}
//                     product={product}
//                     onAddToCart={addToCart}
//                     onAddToWishlist={addToWishlist}
//                   />
//                 ))}
//               </div>
//             </TabsContent>

//             <TabsContent value="trending" className="mt-8">
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {products
//                   .filter((product) => product.trending)
//                   .map((product) => (
//                     <ProductCard
//                       key={product.id}
//                       product={product}
//                       onAddToCart={addToCart}
//                       onAddToWishlist={addToWishlist}
//                     />
//                   ))}
//               </div>
//             </TabsContent>

//             <TabsContent value="featured" className="mt-8">
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {products
//                   .filter((product) => product.featured)
//                   .map((product) => (
//                     <ProductCard
//                       key={product.id}
//                       product={product}
//                       onAddToCart={addToCart}
//                       onAddToWishlist={addToWishlist}
//                     />
//                   ))}
//               </div>
//             </TabsContent>

//             <TabsContent value="new" className="mt-8">
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {products.slice(0, 4).map((product) => (
//                   <ProductCard
//                     key={product.id}
//                     product={product}
//                     onAddToCart={addToCart}
//                     onAddToWishlist={addToWishlist}
//                   />
//                 ))}
//               </div>
//             </TabsContent>
//           </Tabs>

//           <div className="text-center mt-8">
//             <Button size="lg" variant="outline" className="mx-auto">
//               View All Products
//             </Button>
//           </div>
//         </div>
//       </section> */}

//       {/* Deals & Discounts */}
//       {/* <section className="py-16 bg-primary/5">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col md:flex-row items-center justify-between mb-12">
//             <div>
//               <h2 className="text-3xl font-bold mb-4">Limited Time Offers</h2>
//               <p className="text-muted-foreground max-w-xl">
//                 Don't miss out on these amazing deals! Limited stock available.
//               </p>
//             </div>
//             <div className="mt-6 md:mt-0 flex items-center space-x-2">
//               <Clock className="h-6 w-6 text-primary" />
//               <span className="font-semibold">Ends in: 2d 14h 36m</span>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {products
//               .filter((product) => product.discountPrice)
//               .slice(0, 3)
//               .map((product) => (
//                 <Card key={product.id} className="overflow-hidden">
//                   <div className="relative h-64 w-full">
//                     <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
//                     <Badge className="absolute top-4 right-4 bg-red-500 hover:bg-red-600">
//                       {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
//                     </Badge>
//                   </div>
//                   <CardContent className="p-6">
//                     <div className="flex justify-between items-start mb-2">
//                       <CardTitle className="text-xl">{product.name}</CardTitle>
//                       <div className="flex items-center">
//                         <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                         <span className="ml-1 text-sm">{product.rating}</span>
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-2 mt-4">
//                       <span className="text-2xl font-bold text-primary">${product.discountPrice}</span>
//                       <span className="text-muted-foreground line-through">${product.price}</span>
//                     </div>
//                   </CardContent>
//                   <CardFooter className="p-6 pt-0">
//                     <Button className="w-full" onClick={() => addToCart(product.id)}>
//                       Add to Cart
//                     </Button>
//                   </CardFooter>
//                 </Card>
//               ))}
//           </div>
//         </div>
//       </section> */}

//       {/* Payment Methods */}
//       {/* <section className="py-12 bg-white dark:bg-gray-900">
//         <div className="container mx-auto px-4">
//           <h2 className="text-2xl font-semibold text-center mb-8">Secure Payment Methods</h2>
//           <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
//             {paymentMethods.map((method) => (
//               <div key={method.id} className="flex flex-col items-center">
//                 <div className="relative h-12 w-20">
//                   <Image src={method.image || "/placeholder.svg"} alt={method.name} fill className="object-contain" />
//                 </div>
//                 <span className="mt-2 text-sm text-muted-foreground">{method.name}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section> */}

//       {/* Testimonials */}
//       {/* <section className="py-16 bg-muted/30">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {testimonials.map((testimonial) => (
//               <Card key={testimonial.id} className="h-full">
//                 <CardContent className="p-6 flex flex-col h-full">
//                   <div className="flex mb-4">
//                     {Array.from({ length: 5 }).map((_, i) => (
//                       <Star
//                         key={i}
//                         className={cn(
//                           "h-5 w-5",
//                           i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300",
//                         )}
//                       />
//                     ))}
//                   </div>
//                   <p className="text-muted-foreground mb-6 flex-grow">{testimonial.content}</p>
//                   <div>
//                     <p className="font-semibold">{testimonial.name}</p>
//                     <p className="text-sm text-muted-foreground">{testimonial.role}</p>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section> */}

//   {/* Why Choose Us */}
//   <section className="py-20 bg-gray-50 dark:bg-gray-800">
//         <div className="container mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Us</h2>
//             <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//               We're committed to providing the best shopping experience for our customers
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             <div className="bg-white dark:bg-gray-900 rounded-xl p-8 text-center shadow-md transition-transform duration-300 hover:transform hover:scale-105">
//               <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-primary/10 rounded-full">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-8 w-8 text-primary"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Quality Products</h3>
//               <p className="text-gray-600 dark:text-gray-400">
//                 We carefully select every product to ensure the highest quality standards
//               </p>
//             </div>

//             <div className="bg-white dark:bg-gray-900 rounded-xl p-8 text-center shadow-md transition-transform duration-300 hover:transform hover:scale-105">
//               <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-primary/10 rounded-full">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-8 w-8 text-primary"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Fast Shipping</h3>
//               <p className="text-gray-600 dark:text-gray-400">
//                 Quick delivery with real-time tracking for all your orders
//               </p>
//             </div>

//             <div className="bg-white dark:bg-gray-900 rounded-xl p-8 text-center shadow-md transition-transform duration-300 hover:transform hover:scale-105">
//               <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-primary/10 rounded-full">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-8 w-8 text-primary"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Secure Payments</h3>
//               <p className="text-gray-600 dark:text-gray-400">
//                 Multiple secure payment options with encrypted transactions
//               </p>
//             </div>

//             <div className="bg-white dark:bg-gray-900 rounded-xl p-8 text-center shadow-md transition-transform duration-300 hover:transform hover:scale-105">
//               <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-primary/10 rounded-full">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-8 w-8 text-primary"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">24/7 Support</h3>
//               <p className="text-gray-600 dark:text-gray-400">
//                 Our customer service team is available around the clock to assist you
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
     



//     </main>
//   )
// }

// // Product Card Component
// function ProductCard({ product, onAddToCart, onAddToWishlist }) {
//   return (
//     <Card className="h-full overflow-hidden group">
//       <div className="relative">
//         <div className="relative h-64 w-full overflow-hidden">
//           <Image
//             src={product.image || "/placeholder.svg"}
//             alt={product.name}
//             fill
//             className="object-cover transition-transform duration-300 group-hover:scale-105"
//           />
//         </div>
//         <div className="absolute top-4 right-4 flex flex-col gap-2">
//           <button
//             onClick={() => onAddToWishlist(product.id)}
//             className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-primary hover:text-primary-foreground transition-colors"
//             aria-label="Add to wishlist"
//           >
//             <Heart className="h-4 w-4" />
//           </button>
//         </div>
//         {product.discountPrice && (
//           <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">
//             {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
//           </Badge>
//         )}
//       </div>
//       <CardContent className="p-4">
//         <div className="flex justify-between items-start mb-2">
//           <div>
//             <p className="text-sm text-muted-foreground">{product.category}</p>
//             <h3 className="font-semibold">{product.name}</h3>
//           </div>
//           <div className="flex items-center">
//             <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//             <span className="ml-1 text-sm">{product.rating}</span>
//           </div>
//         </div>
//         <div className="flex items-center space-x-2 mt-2">
//           {product.discountPrice ? (
//             <>
//               <span className="font-bold text-primary">${product.discountPrice}</span>
//               <span className="text-sm text-muted-foreground line-through">${product.price}</span>
//             </>
//           ) : (
//             <span className="font-bold">${product.price}</span>
//           )}
//         </div>
//       </CardContent>
//       <CardFooter className="p-4 pt-0">
//         <Button className="w-full" onClick={() => onAddToCart(product.id)}>
//           Add to Cart
//         </Button>
//       </CardFooter>
//     </Card>
//   )
// }


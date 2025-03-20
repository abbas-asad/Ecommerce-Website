"use client"

// import { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { toast } from 'sonner';
import ecommerceConfig from "@ecommerce.config"
import { client } from '@/sanity/lib/client';
import { getOrCreateUserId } from '@/lib/user';
import { useUser } from '@clerk/nextjs';
import { Product as IProduct } from "@/app/studio/sanity.types";

import { useState } from "react"
import { Suspense } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Ruler, Package, Info } from "lucide-react"
import Link from "next/link"
import { Star, Minus, Plus, ShoppingCart, Heart, Share2, Truck, RotateCcw, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductClientPage({ product }: { product: any }) {
    // const discountedPrice = product.discountPercentage
    //     ? product.price - product.price * (product.discountPercentage / 100)
    //     : product.price
    // const [quantity, setQuantity] = useState(product.minimumOrderQuantity)


    const discountedPrice = product.discountPercentage
        ? product.price - product.price * (product.discountPercentage / 100)
        : product.price

    const { isSignedIn } = useUser(); // Clerk authentication check
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('L');
    const [selectedColor, setSelectedColor] = useState('blue');
    const { addItem } = useCart();

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    const handleAddToCart = async () => {
        if (!isSignedIn) {
            toast.error("You must be signed in to add items to the cart.");
            return;
        }

        try {
            const userId = getOrCreateUserId(); // Get user ID
            addItem({
                id: product._id,
                name: product.title,
                price: product.price,
                quantity: quantity,
                image: product.thumbnail,
                size: selectedSize,
                color: selectedColor,
            });
            await client.create({
                _type: 'cart',
                userID: userId,
                product: { _ref: product._id, _type: 'reference' },
                quantity: quantity,
                size: selectedSize,
                color: selectedColor,
            });
            toast.success('Added to cart');
        } catch (error) {
            toast.error('Failed to add to cart. Please try again.');
            console.error('Sanity cart creation error:', error);
        }
    };

    // ...existing UI code (breadcrumb, product gallery, info, tabs, reviews, etc.)...
    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <Suspense fallback={<div>Loading breadcrumbs...</div>}>
                    <nav className="flex mb-8" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                                <Link href="/" className="text-gray-600 hover:text-primary transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <span className="mx-2 text-gray-400">/</span>
                                    <Link
                                        href={`/products/${product.categorySlug}`}
                                        className="text-gray-600 hover:text-primary transition-colors capitalize"
                                    >
                                        {product.category}
                                    </Link>
                                </div>
                            </li>
                            <li aria-current="page">
                                <div className="flex items-center">
                                    <span className="mx-2 text-gray-400">/</span>
                                    <span className="text-gray-800 font-medium">{product.title}</span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </Suspense>

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
                    {/* Product Gallery */}
                    <Suspense fallback={<Skeleton className="w-full aspect-square rounded-lg" />}>
                        <div className="space-y-4">
                            <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square">
                                <Image
                                    src={product.images[0] || "/placeholder.svg"}
                                    alt={product.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                            </div>
                            <div className="flex space-x-4 overflow-x-auto pb-2 hide-scrollbar">
                                {product.images.map((image: string, index: number) => (
                                    <button
                                        key={index}
                                        className={`relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all ${index === 0 ? "border-primary" : "border-transparent hover:border-gray-300"
                                            }`}
                                    >
                                        <Image
                                            src={image || "/placeholder.svg"}
                                            alt={`${product.title} - Image ${index + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="80px"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </Suspense>

                    {/* Product Info */}
                    <Suspense fallback={<div>Loading product information...</div>}>
                        <div className="flex flex-col space-y-6">
                            {/* Title and badges */}
                            <div>
                                <div className="flex items-center space-x-2 mb-2">
                                    {/* <Badge variant="outline" className="text-xs font-medium bg-primary/10 text-primary border-primary/20">
                                        {product.category}
                                    </Badge> */}
                                    {product.stock < 10 && (
                                        <Badge
                                            variant="outline"
                                            className="text-xs font-medium bg-amber-500/10 text-amber-600 border-amber-200"
                                        >
                                            Low Stock
                                        </Badge>
                                    )}
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center">
                                <div className="flex">
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
                                </div>
                                <span className="ml-2 text-sm text-gray-600">
                                    {product.rating.toFixed(1)} ({product.reviews.length} reviews)
                                </span>
                            </div>

                            {/* Price */}
                            <div className="flex items-end space-x-3">
                                <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                                {/* {product.discountPercentage > 0 && (
                                    <>
                                        <span className="text-lg text-gray-500 line-through">${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}</span>
                                        <Badge className="bg-red-500 hover:bg-red-600">-{product.discountPercentage}% OFF</Badge>
                                    </>
                                )} */}
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 leading-relaxed">{product.description}</p>

                            <Separator />

                            {/* Availability */}
                            <div className="flex items-center space-x-2">
                                <div className={`h-3 w-3 rounded-full ${product.stock > 0 ? "bg-green-500" : "bg-red-500"}`} />
                                <span className="text-sm font-medium">
                                    {product.stock > 0 ? `${product.availabilityStatus} - ${product.stock} items left` : "Out of Stock"}
                                </span>
                            </div>

                            {/* Quantity selector */}
                            <div className="flex flex-col space-y-2">
                                <span className="text-sm font-medium text-gray-700">Quantity</span>
                                <div className="flex items-center">
                                    <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100 disabled:opacity-50"
                                        onClick={() => handleQuantityChange(-1)}>
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    {/* <input
                                    type="text"
                                    defaultValue="1"
                                    className="w-16 h-10 border-y border-gray-300 text-center focus:outline-none focus:ring-1 focus:ring-primary"
                                /> */}
                                    <input
                                        type="text"
                                        // type="number"
                                        value={quantity}
                                        className="w-16 h-10 border-y border-gray-300 text-center focus:outline-none focus:ring-1 focus:ring-primary"
                                        readOnly
                                    />
                                    <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100 disabled:opacity-50"
                                        onClick={() => handleQuantityChange(1)}>
                                        <Plus className="h-4 w-4" />
                                    </button>
                                    {/* <span className="ml-3 text-sm text-gray-500">Minimum: {product.minimumOrderQuantity}</span> */}
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex flex-col space-y-4">
                                <div className="flex space-x-4">
                                    <Button className="flex-1 h-12 text-base gap-2" size="lg"
                                        onClick={handleAddToCart}
                                        disabled={!isSignedIn}
                                    >
                                        <ShoppingCart className="h-5 w-5" />
                                        {isSignedIn ? "Add To Cart" : "Sign in to Add to Cart"}
                                    </Button>
                                    {/* <button
                                className={`px-8 py-3 rounded-lg transition-colors ${isSignedIn ? "bg-[#B88E2F] text-white hover:bg-[#A47E2A]" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
                                onClick={handleAddToCart}
                                disabled={!isSignedIn}
                            >
                                {isSignedIn ? "Add To Cart" : "Sign in to Add to Cart"}
                            </button> */}
                                    <Button variant="outline" size="icon" className="h-12 w-12">
                                        <Heart className="h-5 w-5" />
                                    </Button>
                                    <Button variant="outline" size="icon" className="h-12 w-12">
                                        <Share2 className="h-5 w-5" />
                                    </Button>
                                </div>
                                <Button variant="secondary" className="h-12 text-base gap-2" size="lg">
                                    Buy Now
                                </Button>
                            </div>

                            {/* Shipping and returns */}
                            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                                <div className="flex items-start space-x-3">
                                    <Truck className="h-5 w-5 text-gray-600 mt-0.5" />
                                    <div>
                                        <h4 className="font-medium text-gray-900">Shipping</h4>
                                        <p className="text-sm text-gray-600">{product.shippingInformation}</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <RotateCcw className="h-5 w-5 text-gray-600 mt-0.5" />
                                    <div>
                                        <h4 className="font-medium text-gray-900">Returns</h4>
                                        <p className="text-sm text-gray-600">{product.returnPolicy}</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <Shield className="h-5 w-5 text-gray-600 mt-0.5" />
                                    <div>
                                        <h4 className="font-medium text-gray-900">Warranty</h4>
                                        <p className="text-sm text-gray-600">{product.warrantyInformation}</p>
                                    </div>
                                </div>
                            </div>

                            {/* SKU and tags */}
                            <div className="flex flex-col space-y-2 text-sm text-gray-500">
                                <div>
                                    SKU: <span className="font-medium text-gray-700">{product.sku}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span>Tags:</span>
                                    <div className="flex flex-wrap gap-1">
                                        {product.tags.map((tag: string) => (
                                            <Badge key={tag} variant="outline" className="font-normal">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Suspense>
                </div>

                {/* Product Specifications */}
                {/* <div className="mt-16">
                <h2 className="text-2xl font-bold mb-6">Product Specifications</h2>
                <div className="bg-white border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <tbody className="divide-y divide-gray-200">
                            {product.specifications?.map((spec: { name: string; value: string }, index: number) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-1/3">{spec.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{spec.value}</td>
                                </tr>
                            ))}
                            <tr className={product.specifications?.length % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-1/3">Dimensions</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {product.dimensions.width}" × {product.dimensions.height}" × {product.dimensions.depth}"
                                </td>
                            </tr>
                            <tr className={product.specifications?.length % 2 !== 0 ? "bg-gray-50" : "bg-white"}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-1/3">Weight</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.weight} lbs</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div> */}

                {/* Product Tabs */}
                <Tabs defaultValue="details" className="w-full mt-16">
                    <TabsList className="grid w-full grid-cols-3 mb-8">
                        <TabsTrigger value="details" className="flex items-center gap-2">
                            <Info className="h-4 w-4" />
                            <span>Details</span>
                        </TabsTrigger>
                        <TabsTrigger value="specifications" className="flex items-center gap-2">
                            <Ruler className="h-4 w-4" />
                            <span>Specifications</span>
                        </TabsTrigger>
                        <TabsTrigger value="shipping" className="flex items-center gap-2">
                            <Package className="h-4 w-4" />
                            <span>Shipping</span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="details" className="space-y-4">
                        <div className="prose max-w-none text-gray-800">
                            <h3 className="text-xl font-semibold">Product Details</h3>
                            <p className="text-gray-600 my-3">{product.description}</p>

                            <h4 className="text-lg font-medium mt-6">Features</h4>
                            <ul className="list-disc list-inside text-gray-600">
                                <li className="my-3">Made with high-quality materials for superior performance and durability</li>
                                <li className="my-3">Thoughtfully designed for everyday convenience and comfort</li>
                                <li className="my-3">Carefully crafted to ensure freshness, quality, and reliability</li>
                                <li className="my-3">Versatile and suitable for a variety of needs and occasions</li>
                                <li className="my-3">Available in different sizes, variants, and styles to match your preference</li>
                            </ul>

                            <h4 className="text-lg font-medium mt-6">Care Instructions</h4>
                            <ul className="list-disc list-inside text-gray-600">
                                <li className="my-3">Store in a cool, dry place away from direct sunlight</li>
                                <li className="my-3">Follow the provided usage and maintenance guidelines</li>
                                <li className="my-3">Handle with care to maintain product quality and longevity</li>
                                <li className="my-3">Keep away from extreme heat, moisture, and contaminants</li>
                            </ul>

                        </div>

                    </TabsContent>

                    <TabsContent value="specifications" className="space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-medium text-gray-900 mb-2">Dimensions</h4>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div className="text-gray-500">Width:</div>
                                            <div className="font-medium">{product.dimensions.width} inches</div>
                                            <div className="text-gray-500">Height:</div>
                                            <div className="font-medium">{product.dimensions.height} inches</div>
                                            <div className="text-gray-500">Depth:</div>
                                            <div className="font-medium">{product.dimensions.depth} inches</div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-medium text-gray-900 mb-2">Material</h4>
                                        <p className="text-sm">Premium polyester blend with satin finish</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-medium text-gray-900 mb-2">Product Information</h4>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div className="text-gray-500">SKU:</div>
                                            <div className="font-medium">{product.sku}</div>
                                            <div className="text-gray-500">Weight:</div>
                                            <div className="font-medium">{product.weight} oz</div>
                                            <div className="text-gray-500">Category:</div>
                                            <div className="font-medium capitalize">{product.category.replace(/-/g, " ")}</div>
                                            {/* <div className="text-gray-500">Barcode:</div>
              <div className="font-medium">{product.meta.barcode}</div> */}
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="font-medium text-gray-900 mb-2">Size & Fit</h4>
                                        <p className="text-sm">
                                            This item is available in US sizes 2-14. The model is 5&apos;9&quot; and wears a size 6. Please refer to our
                                            size guide for detailed measurements.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="shipping" className="space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>

                            <div className="space-y-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-medium text-gray-900 mb-2">Delivery Options</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center border-b pb-3">
                                            <div>
                                                <div className="font-medium">Standard Shipping</div>
                                                <div className="text-sm text-gray-500">3-5 business days</div>
                                            </div>
                                            <div className="font-medium">$5.99</div>
                                        </div>
                                        <div className="flex justify-between items-center border-b pb-3">
                                            <div>
                                                <div className="font-medium">Express Shipping</div>
                                                <div className="text-sm text-gray-500">1-2 business days</div>
                                            </div>
                                            <div className="font-medium">$12.99</div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="font-medium">Free Shipping</div>
                                                <div className="text-sm text-gray-500">On orders over $100</div>
                                            </div>
                                            <div className="font-medium">$0.00</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-medium text-gray-900 mb-2">Return Policy</h4>
                                    <p className="text-sm mb-3">{product.returnPolicy}</p>
                                    <ul className="text-sm space-y-2 list-disc pl-5 text-gray-600">
                                        <li>Items must be in original condition with tags attached</li>
                                        <li>Return shipping costs are the responsibility of the customer</li>
                                        <li>Exchanges are processed as returns followed by a new order</li>
                                        <li>Gift returns will be issued as store credit</li>
                                    </ul>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-medium text-gray-900 mb-2">International Shipping</h4>
                                    <p className="text-sm mb-3">
                                        We ship to over 100 countries worldwide. International shipping rates and delivery times vary by
                                        location. Import duties and taxes may apply and are the responsibility of the customer.
                                    </p>
                                    <p className="text-sm font-medium">Please allow 7-14 business days for international deliveries.</p>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>


                {/* Customer Reviews */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Rating summary */}
                        <div className="md:col-span-1 space-y-6">
                            <div className="flex flex-col items-center text-center">
                                <div className="text-5xl font-bold text-gray-900">{product.rating.toFixed(1)}</div>
                                <div className="flex mt-2">
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
                                </div>
                                <div className="text-sm text-gray-500 mt-1">Based on {product.reviews.length} reviews</div>
                            </div>

                            <div className="space-y-3">
                                {[5, 4, 3, 2, 1].map((star) => {
                                    const count = product.reviews.filter((r: { rating: number }) => Math.floor(r.rating) === star).length
                                    const percentage = product.reviews.length > 0 ? (count / product.reviews.length) * 100 : 0

                                    return (
                                        <div key={star} className="flex items-center space-x-3">
                                            <div className="flex items-center space-x-1 w-16">
                                                <span className="text-sm font-medium">{star}</span>
                                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                            </div>
                                            <div className="h-2 bg-gray-200 rounded-full flex-1 overflow-hidden">
                                                <div className="h-full bg-yellow-400" style={{ width: `${percentage}%` }}></div>
                                            </div>
                                            <div className="text-sm text-gray-500 w-12 text-right">{count}</div>
                                        </div>
                                    )
                                })}
                            </div>

                            <Button className="w-full bg-black" disabled>Write a Review</Button>
                        </div>

                        {/* Reviews list */}
                        <div className="md:col-span-2 space-y-6">
                            {product.reviews.map(
                                (review: {
                                    _id: string
                                    rating: number
                                    comment: string
                                    date: string
                                    reviewerName: string
                                }) => (
                                    <div key={review._id} className="space-y-3">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="flex items-center space-x-2">
                                                    <div className="flex">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <h4 className="font-medium">{review.reviewerName}</h4>
                                                </div>
                                                <div className="text-sm text-gray-500 mt-1">
                                                    {new Date(review.date).toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    })}
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-gray-700">{review.comment}</p>

                                        <Separator className="my-4" />
                                    </div>
                                ),
                            )}

                            {product.reviews.length === 0 && (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

'use client'

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { toast } from 'sonner';
import ecommerceConfig from "@ecommerce.config"
import { client } from '@/sanity/lib/client';
import { getOrCreateUserId } from '@/lib/user';

export default function ProductClient({ product }: { product: any }) {
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('L');
    const [selectedColor, setSelectedColor] = useState('blue');
    const { addItem } = useCart();

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    const handleAddToCart = async () => {
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
                _type: 'cart', // Create this schema in Sanity first!
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

    return (
        <section className="container mx-auto px-medium lg:px-large py-8">
            {/* Breadcrumb remains the same */}
            <div className="flex items-center space-x-2 text-sm mb-8">
                <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
                <span className="text-gray-500">/</span>
                <Link href="/shop" className="text-gray-500 hover:text-gray-700">Shop</Link>
                <span className="text-gray-500">/</span>
                <span className="text-gray-900">{product.title}</span>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Images section remains the same */}
                <div className="flex gap-4">
                    {/* <div className="flex flex-col gap-4">
                        {[0, 1, 2].map((i) => (
                            <button key={i} className="w-20 h-20 border rounded-lg overflow-hidden bg-[#fff9ef]">
                                <Image
                                    src={product.images[i]}
                                    alt={`${product.title}`}
                                    width={80}
                                    height={80}
                                    className="object-contain w-full h-full bg-center"
                                />
                            </button>
                        ))}
                    </div> */}
                    <div className="flex-1 bg-[#fff9ef] flex items-center">
                        <Image
                            src={product.thumbnail}
                            alt={`${product.title}`}
                            width={500}
                            height={500}
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <h1 className="text-4xl font-semibold">{product.title}</h1>
                    <p className="text-2xl text-gray-600">{ecommerceConfig.currency.prefix}{product.price}</p>

                    {/* Rating section remains the same */}
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                            </svg>
                        ))}
                        <span className="text-gray-600 ml-2">5 Customer Review</span>
                    </div>

                    <p className="text-gray-600">{product.description}</p>

                    <div className="space-y-4">
                        <p className="text-gray-600">Stock: {product.stock}</p>
                        <div className="flex items-center gap-4">
                            <span className="text-gray-600">Size</span>
                            <div className="flex gap-2">
                                {["L", "XL", "XS"].map((size) => (
                                    <button
                                        key={size}
                                        className={`w-8 h-8 border rounded-lg flex items-center justify-center text-sm
                                            ${selectedSize === size ? 'border-black bg-gray-100' : 'hover:border-black'}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-gray-600">Color</span>
                            <div className="flex gap-2">
                                {[
                                    { name: 'blue', class: 'bg-blue-600' },
                                    { name: 'black', class: 'bg-black' },
                                    { name: 'brown', class: 'bg-yellow-700' }
                                ].map((color) => (
                                    <button
                                        key={color.name}
                                        className={`w-6 h-6 rounded-full ${color.class} 
                                            ${selectedColor === color.name ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                                        onClick={() => setSelectedColor(color.name)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4 items-center">
                            <div className="flex border rounded-lg">
                                <button
                                    className="px-4 py-2 border-r hover:bg-gray-100"
                                    onClick={() => handleQuantityChange(-1)}
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    value={quantity}
                                    className="w-16 text-center"
                                    readOnly
                                />
                                <button
                                    className="px-4 py-2 border-l hover:bg-gray-100"
                                    onClick={() => handleQuantityChange(1)}
                                >
                                    +
                                </button>
                            </div>
                            <button
                                className="px-8 py-3 bg-[#B88E2F] text-white rounded-lg hover:bg-[#A47E2A] transition-colors"
                                onClick={handleAddToCart}
                            >
                                Add To Cart
                            </button>
                        </div>
                    </div>

                    {/* Product details section remains the same */}
                    <div className="space-y-2 pt-6 border-t">
                        <p><span className="text-gray-600">SKU:</span> {product.sku}</p>
                        <p><span className="text-gray-600">Category:</span> {product.category}</p>
                        <p><span className="text-gray-600">Tags:</span> {product.tags?.join(', ')}</p>
                        {/* Social share buttons remain the same */}
                    </div>
                </div>
            </div>
        </section>
    );
}
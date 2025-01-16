"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface headingNameProp {
    headingName: string;
    para?: string;
    limit?: number;
}

interface IProduct {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage?: number;
    rating?: number;
    stock: number;
    tags?: string[];
    brand: string;
    sku: string;
    weight?: number;
    dimensions?: {
        width?: number;
        height?: number;
        depth?: number;
    };
    warrantyInformation?: string;
    shippingInformation?: string;
    availabilityStatus: string;
    reviews?: {
        rating: number;
        comment: string;
        date: string;
        reviewerName: string;
        reviewerEmail: string;
    }[];
    returnPolicy?: string;
    minimumOrderQuantity?: number;
    meta?: {
        createdAt?: string;
        updatedAt?: string;
        barcode?: string;
        qrCode?: string;
    };
    images: string[];
    thumbnail: string;
}

export default function Productcards(props: headingNameProp) {
    const [productData, setProductData] = useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch("https://dummyjson.com/products/category/furniture");
            const data = await response.json();
            setProductData(data.products);
            setIsLoading(false); // Data has finished loading
        };

        fetchProducts();
    }, []);

    const displayedProducts = props.limit ? productData.slice(0, props.limit) : productData;

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto py-8 px-medium lg:px-large">
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-semibold mb-4">{props.headingName}</h2>
                    <p className="text-gray-500">{props.para}</p>
                </div>

                {/* Display loading indicator while the data is being fetched */}
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-transparent border-primary"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-16 gap-y-24">
                        {displayedProducts.map((product: IProduct) => (
                            <div key={product.id} className="space-y-3">
                                <Link href={`/products/${product.id}`}>
                                    <div className="cursor-pointer space-y-3">
                                        <div className="aspect-square relative overflow-hidden space-y-3">
                                            <Image
                                                src={product.thumbnail}
                                                alt={product.title}
                                                width={400}
                                                height={400}
                                                className="object-cover"
                                            />
                                        </div>
                                        <h3 className="font-medium text-base line-clamp-1">{product.title}</h3>
                                        <p className="font-semibold text-base">${product.price.toFixed(2)}</p>
                                        {/* <p className="font-semibold text-base text-gray-500">Stock: {product.stock}</p> */}
                                        {/* <p className="text-sm text-green-500">
                                            Discount: {product.discountPercentage}%
                                        </p> */}
                                        <p className="font-semibold text-base text-[#B88E2F]">Rating: {product.rating?.toFixed(1)}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}

                <div className="text-center mt-12">
                    <Link
                        href="#"
                        className="inline-block border-b-2 border-black pb-1 font-medium hover:opacity-70 transition-opacity"
                    >
                        View More
                    </Link>
                </div>
            </div>
        </section>
    );
}

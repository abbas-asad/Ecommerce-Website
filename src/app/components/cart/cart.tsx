"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";
import { useCart, CartItem } from "@/context/cart-context";
import ecommerceConfig from "@ecommerce.config";
import { useState } from "react";
import Loadingmessage from "../loadingmsg";
import EmptyState from "../empty-state";

export default function Cart() {
  const { items: cartItems, updateQuantity, removeItem, loading } = useCart();

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const [isLoading, setIsLoading] = useState(false);

  const handleQuantityChange = async (item: CartItem, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      setIsLoading(true);
      await updateQuantity(item, newQuantity);
    } catch (error) {
      console.error("Quantity update failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveItem = async (item: CartItem) => {
    try {
      setIsLoading(true);
      await removeItem(item);
    } catch (error) {
      console.error("Item removal failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return <Loadingmessage paraName="carts" />;
  }

  if (cartItems.length === 0) {
    return (
      <EmptyState
        title="Your Cart is Empty"
        description="Browse products and add them to your cart."
        buttonText="Shop Now"
        onButtonClick={() => window.location.href = "/shop"}
      />
    );
  }

  return (
    <div className="container mx-auto px-medium lg:px-large py-12">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Carts ({cartItems.length})
      </h1>

      {/* CART ITEMS TABLE */}
      <div className="mb-8">
        {/* Table Header (for MD+ screens) */}
        <div className="hidden md:block bg-gray-100 p-4 rounded-t-lg">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4">
            <div className="text-black font-medium">Product</div>
            <div className="text-black font-medium">Price</div>
            <div className="text-black font-medium">Quantity</div>
            <div className="text-black font-medium">Total</div>
            <div className="text-black font-medium">Actions</div>
          </div>
        </div>

        <div className="border md:border-t-0 rounded-b-lg">
          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.size || ""}-${item.color || ""}`}
              className="grid md:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 p-4 items-center border-b last:border-b-0"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4">
                <div className="bg-gray-100 rounded-lg w-20 h-20 p-2 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-700 text-sm md:text-base">
                    {item.name}
                  </span>
                  {/* {item.size && (
                    <span className="text-gray-500 text-sm">
                      Size: {item.size}
                    </span>
                  )}
                  {item.color && (
                    <span className="text-gray-500 text-sm">
                      Color: {item.color}
                    </span>
                  )} */}
                </div>
              </div>

              {/* Price */}
              <div className="text-gray-700 text-sm md:text-base">
                <span className="md:hidden font-medium mr-2">Price:</span>
                {ecommerceConfig.currency.prefix}
                {item.price.toFixed(2)}
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-2">
                <span className="md:hidden font-medium mr-2">Quantity:</span>
                <button
                  onClick={() => handleQuantityChange(item, item.quantity - 1)}
                  disabled={isLoading}
                  className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item, item.quantity + 1)}
                  disabled={isLoading}
                  className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Item Total */}
              <div className="text-gray-700 text-sm md:text-base">
                {ecommerceConfig.currency.prefix}
                {(item.price * item.quantity).toFixed(2)}
              </div>

              {/* Remove */}
              <div>
                <button
                  onClick={() => handleRemoveItem(item)}
                  disabled={isLoading}
                  className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200"
                >
                  <Trash2 className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CART TOTALS */}
      <div className="flex justify-end">
        <div className="bg-gray-100 rounded-lg p-6 w-full max-w-sm">
          <h2 className="text-xl font-bold mb-6">Cart Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between pb-4 border-b">
              <span>Subtotal</span>
              <span className="text-gray-700">
                {ecommerceConfig.currency.prefix}
                {subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between pb-4 border-b">
              <span>Tax (10%)</span>
              <span className="text-gray-700">
                {ecommerceConfig.currency.prefix}
                {tax.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between pb-4">
              <span className="font-medium">Total</span>
              <span className="text-gray-900 font-medium text-xl">
                {ecommerceConfig.currency.prefix}
                {total.toFixed(2)}
              </span>
            </div>
            <Link href="/checkout" className="block">
              <Button className="w-full bg-black hover:bg-gray-800 text-white">
                Check Out
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

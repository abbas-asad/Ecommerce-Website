'use client'

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, Minus } from 'lucide-react'
import { useCart } from '@/context/cart-context'
import Featuressection from "../components/layout/featuressection"
import ecommerceConfig from "../../../ecommerce.config"
import { client } from '@/sanity/lib/client'
import { useState } from 'react'

export default function CartPage() {
  const { items: cartItems, updateQuantity, removeItem } = useCart()

  // Calculate totals (keep your existing logic)
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  // Add subtle loading state (preserves UI)
  const [isLoading, setIsLoading] = useState(false)

  // Enhanced quantity update with Sanity sync
  const handleQuantityChange = async (id: string, newQuantity: number) => {
    try {
      setIsLoading(true)
      updateQuantity(id, newQuantity)

      // Optional: Immediate Sanity sync
      const userId = localStorage.getItem('userId')
      if (userId) {
        await client.patch({
          query: `*[_type == "cart" && userID == $userId && product._ref == $productId][0]`,
          params: { userId, productId: id },
          set: { quantity: newQuantity }
        })
      }
    } catch (error) {
      console.error('Quantity update failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Enhanced remove item with Sanity sync
  const handleRemoveItem = async (id: string) => {
    try {
      setIsLoading(true)
      removeItem(id)

      // Optional: Immediate Sanity cleanup
      const userId = localStorage.getItem('userId')
      if (userId) {
        await client.delete({
          query: `*[_type == "cart" && userID == $userId && product._ref == $productId]`,
          params: { userId, productId: id }
        })
      }
    } catch (error) {
      console.error('Item removal failed:', error)
    } finally {
      setIsLoading(false)
    }
  }


  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-medium lg:px-large py-[30vh] text-center">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
        <p className="text-gray-500 mb-4">Your cart is empty</p>
        <Link href="/shop">
          <Button className="bg-[#B88E2F] hover:bg-[#A47E2A] text-white">
            Continue Shopping
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="container mx-auto px-medium lg:px-large py-8">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-3">
            <div className="hidden md:block bg-[#FFF9E5] p-4 rounded-t-lg">
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4">
                <div className="text-black font-medium">Product</div>
                <div className="text-black font-medium">Price</div>
                <div className="text-black font-medium">Quantity</div>
                <div className="text-black font-medium">Total</div>
                <div className="text-black font-medium">Actions</div>
              </div>
            </div>

            <div className="border border-t-0 rounded-b-lg">
              {cartItems.map((item) => (
                <div key={item.id} className="grid md:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 p-4 items-center border-b last:border-b-0">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#FFF9E5] rounded-lg w-20 h-20 p-2 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-sm md:text-base">{item.name}</span>
                      {item.size && (
                        <span className="text-gray-400 text-sm">Size: {item.size}</span>
                      )}
                      {item.color && (
                        <span className="text-gray-400 text-sm">Color: {item.color}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-gray-500 text-sm md:text-base">
                    <span className="md:hidden font-medium mr-2">Price:</span>
                    {ecommerceConfig.currency.prefix}{item.price.toFixed(2)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="md:hidden font-medium mr-2">Quantity:</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={isLoading}
                      className="bg-[#FFF9E5] p-2 rounded-lg hover:bg-[#FFF0CC]"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      disabled={isLoading}
                      className="bg-[#FFF9E5] p-2 rounded-lg hover:bg-[#FFF0CC]"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-gray-500 text-sm md:text-base">
                    {ecommerceConfig.currency.prefix}{(item.price * item.quantity).toFixed(2)}
                  </div>
                  <div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={isLoading}
                      className="bg-[#FFF9E5] p-2 rounded-lg hover:bg-[#FFF0CC]"
                    >
                      <Trash2 className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:mt-0 mt-8">
            <div className="bg-[#FFF9E5] rounded-lg p-6">
              <h2 className="text-xl font-bold mb-6">Cart Totals</h2>
              <div className="space-y-4">
                <div className="flex justify-between pb-4 border-b">
                  <span>Subtotal</span>
                  <span className="text-gray-600">{ecommerceConfig.currency.prefix}{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pb-4 border-b">
                  <span>Tax (10%)</span>
                  <span className="text-gray-600">{ecommerceConfig.currency.prefix}{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pb-4">
                  <span className="font-medium">Total</span>
                  <span className="text-[#B88E2F] font-medium text-xl">{ecommerceConfig.currency.prefix}{total.toFixed(2)}</span>
                </div>
                <Link href="/checkout" className="block">
                  <Button className="w-full bg-[#000000] hover:bg-gray-800 text-white">
                    Check Out
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Featuressection />
    </>
  )
}
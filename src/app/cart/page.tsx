'use client'

// import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import Featuressection from "../components/featuressection"

const initialCartItems = [
  {
    id: 1,
    name: "Asgaard sofa",
    price: 2500.00,
    quantity: 1,
    image: "/asgsofa.png"
  }
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    )
  }

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <>
      <div className="container mx-auto px-medium lg:px-large py-8">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items Table */}
          <div className="lg:col-span-2">
            {/* Table Header - hidden on mobile */}
            <div className="hidden md:block bg-[#FFF9E5] p-4 rounded-t-lg">
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4">
                <div className="text-black font-medium">Product</div>
                <div className="text-black font-medium">Price</div>
                <div className="text-black font-medium">Quantity</div>
                {/* <div className="text-black font-medium">Subtotal</div> */}

              </div>
            </div>

            {/* Table Body */}
            <div className="border border-t-0 rounded-b-lg">
              {cartItems.map((item) => (
                <div key={item.id} className="grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-4 p-4 items-center border-b last:border-b-0">
                  <div className="flex items-center gap-4">
                    {/* <div className="bg-[#FFF9E5] rounded-lg w-[80px] h-[80px] p-2 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="w-full h-full object-cover"
                    />
                  </div> */}
                    <span className="text-gray-500 text-sm md:text-base">{item.name}</span>
                  </div>
                  <div className="text-gray-500 text-sm md:text-base">
                    <span className="md:hidden font-medium mr-2">Price:</span>
                    ${item.price.toFixed(2)}
                  </div>
                  <div className="flex items-center">
                    <span className="md:hidden font-medium mr-2">Quantity:</span>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      className="w-20 text-center text-sm"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    {/* <span className="text-sm md:text-base">
                      <span className="md:hidden font-medium mr-2">Subtotal:</span>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span> */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="bg-[#FFF9E5] p-2 rounded-lg hover:bg-[#FFF0CC] transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Totals */}
          <div className="lg:mt-0 mt-8">
            <div className="bg-[#FFF9E5] rounded-lg p-6">
              <h2 className="text-xl font-bold mb-6">Cart Totals</h2>
              <div className="space-y-4">
                <div className="flex justify-between pb-4 border-b">
                  <span>Subtotal</span>
                  <span className="text-gray-600">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pb-4">
                  <span className="font-medium">Total</span>
                  <span className="text-[#B88E2F] font-medium text-xl">${subtotal.toFixed(2)}</span>
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


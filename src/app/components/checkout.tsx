"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useCart } from '@/context/cart-context'
import Image from "next/image"
import ecommerceConfig from "../../../ecommerce.config"

export default function Checkout() {
  const { items: cartItems } = useCart()

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + tax

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-medium lg:px-large py-[30vh] text-center">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
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
    <div className="container mx-auto px-medium lg:px-large py-8">
      <div className="grid lg:grid-cols-2 gap-16">
        {/* Billing Details Form */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Billing details</h2>
          <form className="space-y-6">
            {/* ... (previous form fields remain the same) ... */}
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-gray-50 p-8 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Your Order</h3>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="rounded-lg"
                    />
                    <div>
                      <span className="text-gray-600">{item.name}</span>
                      <div className="text-sm text-gray-500">
                        {item.quantity} × {ecommerceConfig.currency.prefix}{item.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <span>{ecommerceConfig.currency.prefix}{(item.quantity * item.price).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between border-t pt-4">
                <span className="text-gray-600">Subtotal</span>
                <span>{ecommerceConfig.currency.prefix}{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t pt-4">
                <span className="text-gray-600">Tax (10%)</span>
                <span>{ecommerceConfig.currency.prefix}{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t pt-4">
                <span className="font-semibold">Total</span>
                <span className="text-[#B88E2F] font-semibold text-xl">{ecommerceConfig.currency.prefix}{total.toFixed(2)}</span>
              </div>

              <RadioGroup defaultValue="bank-transfer" className="mt-6">
                {/* ... (previous radio group content remains the same) ... */}
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash" className="font-medium">Cash On Delivery</Label>
                </div>
              </RadioGroup>

              <div className="text-sm text-gray-600 mt-6 ml-6">
                Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our{" "}
                <Link href="/#" className="text-black hover:underline">
                  privacy policy
                </Link>
                .
              </div>

              <Button className="w-full bg-[#B88E2F] hover:bg-[#A47E2A] text-white">
                Place order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
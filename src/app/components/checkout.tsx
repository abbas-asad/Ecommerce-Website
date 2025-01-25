"use client"

import { useState, FormEvent } from 'react'
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
import { createClient } from '@sanity/client'

// Sanity client configuration
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_WRITE_TOKEN
})

export default function Checkout() {
  const { items: cartItems, clearCart } = useCart()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: 'Karachi',
    additionalInfo: '',
    paymentMethod: 'cash'
  })

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const orderDocument = {
      _type: 'order',
      customer: {
        _type: 'customer',
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        address: formData.address,
        city: formData.city
      },
      items: cartItems.map(item => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      paymentMethod: formData.paymentMethod,
      additionalInfo: formData.additionalInfo,
      totals: {
        subtotal,
        tax,
        total
      },
      status: 'pending',
      createdAt: new Date().toISOString()
    }

    try {
      await sanityClient.create(orderDocument)
      clearCart()
      // TODO: Add order confirmation page/redirect
    } catch (error) {
      console.error('Order submission failed:', error)
    }
  }

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
      <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-16">
        {/* Billing Details Form */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Billing details</h2>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                required
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Select
                // id="city"
                value={formData.city}
                onValueChange={(value) => setFormData(prev => ({ ...prev, city: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Karachi">Karachi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Additional information</Label>
              <Textarea
                id="additionalInfo"
                placeholder="Additional information"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                className="min-h-[100px]"
              />
            </div>

            <RadioGroup
              value={formData.paymentMethod}
              onValueChange={(value) => setFormData(prev => ({
                ...prev,
                paymentMethod: value
              }))}
              className="mt-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                <Label htmlFor="bank-transfer" className="font-medium">Direct Bank Transfer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash" className="font-medium">Cash On Delivery</Label>
              </div>
            </RadioGroup>
          </div>
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

              <Button
                type="submit"
                className="w-full bg-[#B88E2F] hover:bg-[#A47E2A] text-white mt-4"
              >
                Place order
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
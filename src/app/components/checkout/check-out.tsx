"use client"

import { useState, FormEvent } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useCart } from '@/context/cart-context'
import Image from "next/image"
import ecommerceConfig from "@ecommerce.config"
import { client } from '@/sanity/lib/client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'
import Loadingmessage from '../loadingmsg'
import EmptyState from '../empty-state'

// Zod validation schema
const formSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, { message: "First name must be at least 2 characters" })
    .max(50, { message: "First name must be at most 50 characters" }),

  lastName: z
    .string()
    .trim()
    .min(2, { message: "Last name must be at least 2 characters" })
    .max(50, { message: "Last name must be at most 50 characters" })
    .optional(),

  phone: z
    .string()
    .trim()
    .regex(/^(03\d{9}|\+92\d{10})$/, { message: "Enter a valid phone number (e.g. 03112540080 or +923112540080)" }),

  address: z
    .string()
    .trim()
    .min(5, { message: "Address must be at least 5 characters long" })
    .max(100, { message: "Address must be at most 100 characters" }),

  city: z
    .string()
    .trim()
    .min(2, { message: "City name must be at least 2 characters" })
    .max(50, { message: "City name must be at most 50 characters" }),

  additionalInfo: z
    .string()
    .trim()
    .max(200, { message: "Additional information must be at most 200 characters" })
    .optional(),

  paymentMethod: z.enum(["bank-transfer", "cash"], {
    message: "Select a valid payment method",
  }),
})

type FormValues = z.infer<typeof formSchema>

export default function CheckOut() {
  const { items: cartItems, clearCart, loading } = useCart()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: 'Karachi',
      paymentMethod: 'cash'
    }
  })

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true)
      const userId = localStorage.getItem('userId') || uuidv4()
      const orderId = uuidv4()

      const orderDocument = {
        _type: 'order',
        orderId,
        userId,
        customer: {
          _type: 'customer',
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          address: data.address,
          city: data.city
        },
        items: cartItems.map(item => ({
          _key: uuidv4(),
          product: { _ref: item.id, _type: 'reference' },
          quantity: item.quantity,
          price: item.price,
          size: item.size,
          color: item.color
        })),
        paymentMethod: data.paymentMethod,
        additionalInfo: data.additionalInfo,
        totals: {
          subtotal,
          tax,
          total
        },
        status: 'pending',
        createdAt: new Date().toISOString()
      }

      await client.create(orderDocument)
      clearCart()
      toast.success('Order placed successfully!')
      router.push(`/orders/${userId}`)
    } catch (error) {
      console.error('Order submission failed:', error)
      toast.error('Failed to place order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // First check if cart is still loading
  if (loading) {
    return (
      <Loadingmessage paraName="checkout" />
    )
  }

  // Then check if the cart is empty
  if (cartItems.length === 0) {
    return <EmptyState
      title="No Items to Checkout"
      description="Browse products and add them to your cart before proceeding."
      buttonText="Continue Shopping"
      onButtonClick={() => window.location.href = "/shop"}
    />
  }

  return (
    <div className="container mx-auto px-medium lg:px-large py-12">
      <form onSubmit={handleSubmit(onSubmit)} className="grid lg:grid-cols-2 gap-16">
        {/* Billing Details Form */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Billing details</h2>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} id="firstName" />
                  )}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} id="lastName" />
                  )}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Input {...field} id="phone" type="tel" />
                )}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <Input {...field} id="address" />
                )}
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Karachi">Karachi</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Additional information</Label>
              <Controller
                name="additionalInfo"
                control={control}
                render={({ field }) => (
                  <Textarea {...field} id="additionalInfo" className="min-h-[100px]" />
                )}
              />
            </div>

            <Controller
              name="paymentMethod"
              control={control}
              render={({ field }) => (
                <RadioGroup value={field.value} onValueChange={field.onChange} className="mt-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="font-medium">Cash On Delivery</Label>
                  </div>
                </RadioGroup>
              )}
            />
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-gray-100 p-8 rounded-lg">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
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
                <span className="text-gray-900 font-semibold text-xl">{ecommerceConfig.currency.prefix}{total.toFixed(2)}</span>
              </div>

              {/* <Button type="submit" className="w-full bg-[#B88E2F] hover:bg-[#A47E2A] text-white mt-4" disabled={isSubmitting}>
                Place order
              </Button> */}
              <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white" disabled={isSubmitting}>
                Place order
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

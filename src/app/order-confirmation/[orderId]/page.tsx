// app/order-confirmation/[orderId]/page.tsx
"use client"

import { useEffect, useState } from 'react'
import { client } from '@/sanity/lib/client'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import ecommerceConfig from "../../../../ecommerce.config"

interface Order {
  orderId: string
  status: string
  createdAt: string
  customer: {
    firstName: string
    lastName: string
    address: string
    city: string
    phone: string
  }
  items: Array<{
    product: {
      _ref: string
      title: string
      images: string[]
    }
    quantity: number
    price: number
    size?: string
    color?: string
  }>
  totals: {
    subtotal: number
    tax: number
    total: number
  }
}

export default function OrderConfirmation({ params }: { params: { orderId: string } }) {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const query = `*[_type == "order" && orderId == $orderId][0]{
          orderId,
          status,
          createdAt,
          customer,
          items[]{
            product->{_id, title, images},
            quantity,
            price,
            size,
            color
          },
          totals
        }`
        
        const result = await client.fetch(query, { orderId: params.orderId })
        if (!result) throw new Error('Order not found')
        setOrder(result)
      } catch (error) {
        console.error('Error fetching order:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchOrder()
  }, [params.orderId])

  if (loading) {
    return (
      <div className="container mx-auto px-medium lg:px-large py-[30vh] text-center">
        <p className="text-gray-500">Loading order details...</p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container mx-auto px-medium lg:px-large py-[30vh] text-center">
        <h1 className="text-2xl font-bold mb-6">Order Not Found</h1>
        <p className="text-gray-500 mb-4">The requested order could not be found</p>
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
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-2xl font-bold mb-6">Order Confirmation #{order.orderId}</h1>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
              <div className="space-y-2">
                <p><span className="font-medium">Name:</span> {order.customer.firstName} {order.customer.lastName}</p>
                <p><span className="font-medium">Address:</span> {order.customer.address}</p>
                <p><span className="font-medium">City:</span> {order.customer.city}</p>
                <p><span className="font-medium">Phone:</span> {order.customer.phone}</p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <p><span className="font-medium">Order Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
                <p><span className="font-medium">Status:</span> <span className="text-[#B88E2F] capitalize">{order.status}</span></p>
              </div>
            </div>
          </div>

          <h2 className="text-lg font-semibold mb-4">Order Items</h2>
          <div className="border rounded-lg mb-8">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border-b last:border-b-0">
                <div className="flex items-center gap-4">
                  <div className="bg-[#FFF9E5] rounded-lg w-20 h-20 p-2">
                    {item.product.images && (
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.title}
                        width={80}
                        height={80}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{item.product.title}</h3>
                    <p className="text-gray-500 text-sm">
                      {item.quantity} × {ecommerceConfig.currency.prefix}{item.price.toFixed(2)}
                    </p>
                    {item.size && <p className="text-gray-500 text-sm">Size: {item.size}</p>}
                    {item.color && <p className="text-gray-500 text-sm">Color: {item.color}</p>}
                  </div>
                </div>
                <span className="font-medium">
                  {ecommerceConfig.currency.prefix}{(item.quantity * item.price).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-[#FFF9E5] rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Order Totals</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{ecommerceConfig.currency.prefix}{order.totals.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%):</span>
                <span>{ecommerceConfig.currency.prefix}{order.totals.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span className="text-[#B88E2F]">{ecommerceConfig.currency.prefix}{order.totals.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/shop">
              <Button className="bg-[#000000] hover:bg-gray-800 text-white">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
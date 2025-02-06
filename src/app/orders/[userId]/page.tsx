"use client"

import { useEffect, useState } from "react"
import { client } from "@/sanity/lib/client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import ecommerceConfig from "@ecommerce.config"

interface Order {
  _id: string
  orderId: string
  status: string
  paymentStatus: string
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
      _id: string
      title: string
      imageUrl: string
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

export default function OrderConfirmation({ params }: { params: { userId: string } }) {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const query = `*[_type == "order" && userId == $userId] | order(createdAt desc) {
          _id,
          orderId,
          userId,
          status,
          paymentStatus,
          createdAt,
          customer,
          items[]{
            product->{
              _id,
              title,
              "imageUrl": images[0].asset->url
            },
            quantity,
            price,
            size,
            color
          },
          totals
        }`

        const result = await client.fetch(query, { userId: params.userId })
        if (!result || result.length === 0) throw new Error("No orders found")
        setOrders(result)
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [params.userId])

  if (loading) {
    return <LoadingState />
  }

  if (orders.length === 0) {
    return <NoOrders />
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Your Orders</h1>
          <p className="text-gray-600">View and track your orders</p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-lg font-semibold">Order #{order.orderId}</h2>
                    <p className="text-sm text-gray-500">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#B88E2F] font-semibold capitalize">{order.status}</p>
                    <p className="text-sm text-gray-500 capitalize">Payment: {order.paymentStatus}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Image
                            src={item.product.imageUrl || "/placeholder.png"}
                            alt={item.product.title}
                            width={50}
                            height={50}
                            className="rounded-md"
                          />
                          <div>
                            <p className="font-medium">{item.product.title}</p>
                            <div className="text-sm text-gray-500">
                              {item.size && <span>Size: {item.size} </span>}
                              {item.color && <span>• Color: {item.color}</span>}
                            </div>
                            <p className="text-sm text-gray-500">
                              Qty: {item.quantity} × {ecommerceConfig.currency.prefix}
                              {/* {item.price.toFixed(2)} */}
                            </p>
                          </div>
                        </div>
                        <p className="font-medium">
                          {ecommerceConfig.currency.prefix}
                          {/* {(item.price * item.quantity).toFixed(2)} */}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>
                        {ecommerceConfig.currency.prefix}
                        {/* {order.totals.subtotal.toFixed(2)} */}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span>Tax</span>
                      <span>
                        {ecommerceConfig.currency.prefix}
                        {/* {order.totals.tax.toFixed(2)} */}
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold mt-2 text-lg">
                      <span>Total</span>
                      <span className="text-[#B88E2F]">
                        {ecommerceConfig.currency.prefix}
                        {/* {order.totals.total.toFixed(2)} */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/shop">
            <Button className="bg-[#B88E2F] hover:bg-[#A47E2A] text-white">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

function LoadingState() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-[30vh] text-center">
      <p className="text-gray-500">Loading your orders...</p>
    </div>
  )
}

function NoOrders() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-[30vh] text-center">
      <h1 className="text-2xl font-bold mb-6">No Orders Found</h1>
      <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
      <Link href="/shop">
        <Button className="bg-[#B88E2F] hover:bg-[#A47E2A] text-white">Start Shopping</Button>
      </Link>
    </div>
  )
}


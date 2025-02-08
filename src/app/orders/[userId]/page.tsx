"use client"

import { useEffect, useState } from "react"
import { client } from "@/sanity/lib/client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import ecommerceConfig from "@ecommerce.config"
import { Clock, PackageCheck, BadgeCheck } from "lucide-react"

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
    <section className="py-8 md:py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-xl md:text-2xl font-bold">Orders ({orders.length})</h1>
          </div>
          <p className="text-sm md:text-base text-gray-600">Track and manage your purchases</p>
        </div>

        <div className="space-y-4 md:space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-sm md:shadow-lg overflow-hidden border border-gray-100">
              <div className="p-4 md:p-6 bg-gray-50 border-b border-gray-200">
                <div className="flex flex-col gap-4">
                  <div>
                    <h2 className="text-base md:text-lg font-semibold line-clamp-1">
                      Order Id #{order.orderId}
                    </h2>
                    <p className="text-xs md:text-sm text-gray-500 mt-1">
                      Placed on{' '}
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                      {' at '}
                      {new Date(order.createdAt).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* <span className={`px-2 py-1 rounded-full text-xs md:text-sm ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {order.status}
                      </span> */}
                      {/* {order.paymentStatus === 'paid' && (
                        <div className="flex items-center gap-1">
                          <BadgeCheck className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                          <span className="text-xs md:text-sm text-gray-600">Paid</span>
                        </div>
                      )} */}
                    </div>

                    <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                      <Clock className="w-3 h-3 md:w-4 md:h-4" />
                      <span>Est. delivery in 2 business days</span> <span className={`px-2 py-1 rounded-full text-xs md:text-sm ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 md:p-6">
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex flex-col md:flex-row md:items-center justify-between pb-3 md:pb-4 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-start gap-3 md:gap-4 mb-2 md:mb-0">
                        <Image
                          src={item.product.imageUrl || "/placeholder.png"}
                          alt={item.product.title}
                          width={60}
                          height={60}
                          className="rounded-md border border-gray-200 w-12 h-12 md:w-16 md:h-16"
                        />
                        <div>
                          <p className="text-sm md:text-base font-medium">{item.product.title}</p>
                          <div className="text-xs md:text-sm text-gray-500 mt-1">
                            {item.size && <span>Size: {item.size}</span>}
                            {item.color && <span> • Color: {item.color}</span>}
                          </div>
                          <p className="text-xs md:text-sm text-gray-500 mt-1">
                            Qty: {item.quantity} × {ecommerceConfig.currency.prefix}
                            {item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm md:text-base font-medium md:text-right ml-14 md:ml-0">
                        {ecommerceConfig.currency.prefix}
                        {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-gray-200">
                  <div className="space-y-2 max-w-[400px] ml-auto">
                    <div className="flex justify-between text-xs md:text-sm">
                      <span>Subtotal</span>
                      <span>
                        {ecommerceConfig.currency.prefix}
                        {order.totals.subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs md:text-sm">
                      <span>Tax</span>
                      <span>
                        {ecommerceConfig.currency.prefix}
                        {order.totals.tax.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold pt-2 text-base md:text-lg">
                      <span>Total</span>
                      <span className="text-[#B88E2F]">
                        {ecommerceConfig.currency.prefix}
                        {order.totals.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 md:mt-8 flex justify-center">
          <Link href="/shop">
            <Button className="bg-[#B88E2F] hover:bg-[#A47E2A] text-white px-6 py-3 md:px-8 md:py-4 text-sm md:text-base">
              Continue Shopping
            </Button>
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
      <p className="text-gray-500 mb-4">You haven&apos;t placed any orders yet.</p>
      <Link href="/shop">
        <Button className="bg-[#B88E2F] hover:bg-[#A47E2A] text-white">Start Shopping</Button>
      </Link>
    </div>
  )
}


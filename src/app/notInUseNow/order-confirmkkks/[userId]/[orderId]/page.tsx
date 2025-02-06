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

export default function OrderConfirmation({ params }: { params: { userId: string; orderId: string } }) {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const query = `*[_type == "order" && customer._ref == $userId] | order(createdAt desc) {
          _id,
          orderId,
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
        if (!result || result.length === 0) throw new Error("Orders not found")
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
    return <OrderNotFound />
  }

  const currentOrder = orders.find((order) => order.orderId === params.orderId)
  if (!currentOrder) {
    return <OrderNotFound />
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <OrderDetails order={currentOrder} />
        <div className="mt-8 flex justify-between items-center">
          <Link href="/shop">
            <Button className="bg-[#B88E2F] hover:bg-[#A47E2A] text-white">Continue Shopping</Button>
          </Link>
          <Link href={`/order-history/${params.userId}`}>
            <Button variant="outline">View All Orders</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

function OrderDetails({ order }: { order: Order }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
      <div className="px-6 py-8">
        <OrderHeader order={order} />
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <CustomerInformation customer={order.customer} />
          <OrderSummary order={order} />
        </div>
        <OrderItems items={order.items} />
        <OrderTotals totals={order.totals} />
      </div>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-[30vh] text-center">
      <p className="text-gray-500">Loading order details...</p>
    </div>
  )
}

function OrderNotFound() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-[30vh] text-center">
      <h1 className="text-2xl font-bold mb-6">Order Not Found</h1>
      <p className="text-gray-500 mb-4">The requested order could not be found</p>
      <Link href="/shop">
        <Button className="bg-[#B88E2F] hover:bg-[#A47E2A] text-white">Continue Shopping</Button>
      </Link>
    </div>
  )
}

function OrderHeader({ order }: { order: Order }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Order Details</h1>
      <p className="text-gray-600">Order ID: #{order.orderId}</p>
    </div>
  )
}

function CustomerInformation({ customer }: { customer: Order["customer"] }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
      <div className="space-y-2">
        <p>
          <span className="font-medium">Name:</span> {customer.firstName} {customer.lastName}
        </p>
        <p>
          <span className="font-medium">Address:</span> {customer.address}
        </p>
        <p>
          <span className="font-medium">City:</span> {customer.city}
        </p>
        <p>
          <span className="font-medium">Phone:</span> {customer.phone}
        </p>
      </div>
    </div>
  )
}

function OrderSummary({ order }: { order: Order }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      <div className="space-y-2">
        <p>
          <span className="font-medium">Order ID:</span> {order.orderId}
        </p>
        <p>
          <span className="font-medium">Order Date:</span> {new Date(order.createdAt).toLocaleDateString()}
        </p>
        <p>
          <span className="font-medium">Status:</span> <span className="text-[#B88E2F] capitalize">{order.status}</span>
        </p>
        <p>
          <span className="font-medium">Payment Status:</span>{" "}
          <span className="text-[#B88E2F] capitalize">{order.paymentStatus}</span>
        </p>
      </div>
    </div>
  )
}

function OrderItems({ items }: { items: Order["items"] }) {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Order Items</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3 font-semibold text-gray-700">
                Product
              </th>
              <th scope="col" className="px-6 py-3 font-semibold text-gray-700">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3 font-semibold text-gray-700">
                Price
              </th>
              <th scope="col" className="px-6 py-3 font-semibold text-gray-700">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="bg-white border-b">
                <td className="px-6 py-4 font-medium text-gray-900">
                  <div className="flex items-center">
                    <Image
                      src={item.product.imageUrl || "/placeholder.png"}
                      alt={item.product.title}
                      width={50}
                      height={50}
                      className="mr-4"
                    />
                    <div>
                      <p>{item.product.title}</p>
                      {item.size && <p className="text-xs text-gray-500">Size: {item.size}</p>}
                      {item.color && <p className="text-xs text-gray-500">Color: {item.color}</p>}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">{item.quantity}</td>
                <td className="px-6 py-4">
                  {ecommerceConfig.currency.prefix}
                  {item.price.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  {ecommerceConfig.currency.prefix}
                  {(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function OrderTotals({ totals }: { totals: Order["totals"] }) {
  return (
    <div className="mt-8 text-right">
      <p className="text-gray-700">
        Subtotal:{" "}
        <span className="font-medium">
          {ecommerceConfig.currency.prefix}
          {totals.subtotal.toFixed(2)}
        </span>
      </p>
      <p className="text-gray-700">
        Tax:{" "}
        <span className="font-medium">
          {ecommerceConfig.currency.prefix}
          {totals.tax.toFixed(2)}
        </span>
      </p>
      <p className="text-xl font-bold mt-2">
        Total:{" "}
        <span className="text-[#B88E2F]">
          {ecommerceConfig.currency.prefix}
          {totals.total.toFixed(2)}
        </span>
      </p>
    </div>
  )
}


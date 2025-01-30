"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { client } from '@/sanity/lib/client'
import { getOrCreateUserId } from '@/lib/user'

export type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  size?: string
  color?: string
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  userId: string
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const STORAGE_KEY = "shopping-cart"

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [userId, setUserId] = useState<string>('')

  // Get or create user ID
  useEffect(() => {
    const id = getOrCreateUserId()
    setUserId(id)
  }, [])

  // Sanity cart sync logic
  const syncWithSanity = useCallback(async (userId: string) => {
    try {
      // Delete existing Sanity cart items
      const existingCartItems = await client.fetch(
        `*[_type == "cart" && userID == $userId]._id`,
        { userId }
      )
      await Promise.all(existingCartItems.map((id: string) => client.delete(id)))

      // Create new Sanity cart items
      await Promise.all(
        items.map(item =>
          client.create({
            _type: 'cart',
            userID: userId,
            product: { _ref: item.id, _type: 'reference' },
            quantity: item.quantity,
            size: item.size,
            color: item.color
          })
        )
      )
    } catch (error) {
      console.error('Sanity cart sync failed:', error)
    }
  }, [items])

  // Initial load
  useEffect(() => {
    const loadCart = async () => {
      if (!userId) return

      // Load from localStorage
      const savedCart = localStorage.getItem(STORAGE_KEY)
      const localItems = savedCart ? JSON.parse(savedCart) : []

      // Load from Sanity
      try {
        const sanityCart = await client.fetch(
          `*[_type == "cart" && userID == $userId] {
            product->{_id, title, price, thumbnail},
            quantity,
            size,
            color
          }`,
          { userId }
        )

        const sanityItems = sanityCart.map((item: any) => ({
          id: item.product._id,
          name: item.product.title,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.thumbnail,
          size: item.size,
          color: item.color
        }))

        // Merge carts (Sanity as source of truth)
        setItems([...sanityItems, ...localItems.filter((localItem: CartItem) =>
          !sanityItems.some((sanityItem: CartItem) =>
            sanityItem.id === localItem.id &&
            sanityItem.size === localItem.size &&
            sanityItem.color === localItem.color
          )
        )])
      } catch (error) {
        console.error('Sanity cart load failed:', error)
        setItems(localItems)
      }
      setIsLoaded(true)
    }

    loadCart()
  }, [userId])

  // Persist to Sanity and localStorage
  useEffect(() => {
    if (!isLoaded || !userId) return

    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))

    // Sync to Sanity
    syncWithSanity(userId)
  }, [items, userId, isLoaded, syncWithSanity])

  const addItem = (newItem: CartItem) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        item => item.id === newItem.id &&
          item.size === newItem.size &&
          item.color === newItem.color
      )

      if (existingItem) {
        return currentItems.map(item =>
          item.id === newItem.id ?
            { ...item, quantity: item.quantity + newItem.quantity } :
            item
        )
      }

      return [...currentItems, newItem]
    })
  }

  const removeItem = (id: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        userId
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
// cart-context.tsx
"use client"

import { createContext, useContext, useState, useEffect } from "react"
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
  addItem: (item: CartItem) => Promise<void>
  removeItem: (item: CartItem) => Promise<void>
  updateQuantity: (item: CartItem, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  totalItems: number
  userId: string
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const STORAGE_KEY = "shopping-cart"

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isInitialized, setIsInitialized] = useState(false)
  const [userId, setUserId] = useState<string>('')

  // Get or create user ID
  useEffect(() => {
    const id = getOrCreateUserId()
    setUserId(id)
  }, [])

  // On initialization, load the cart from localStorage (if available) 
  // Otherwise, load from Sanity. (Choose one source of truth.)
  useEffect(() => {
    if (!userId) return

    const loadCart = async () => {
      const savedCart = localStorage.getItem(STORAGE_KEY)
      if (savedCart) {
        setItems(JSON.parse(savedCart))
      } else {
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

          setItems(sanityItems)
          localStorage.setItem(STORAGE_KEY, JSON.stringify(sanityItems))
        } catch (error) {
          console.error('Sanity cart load failed:', error)
        }
      }
      setIsInitialized(true)
    }

    loadCart()
  }, [userId])

  // Helper: Update localStorage
  const persistLocalCart = (updatedItems: CartItem[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems))
  }

  // Helper: Create or update a cart document in Sanity
  const syncCartItem = async (cartItem: CartItem) => {
    try {
      // First, try to fetch an existing cart doc that matches userID and product variant.
      const existing = await client.fetch(
        `*[_type=="cart" && userID==$userId && product._ref==$productId && size==$size && color==$color][0]._id`,
        {
          userId,
          productId: cartItem.id,
          size: cartItem.size || "",
          color: cartItem.color || ""
        }
      )

      if (existing) {
        // If exists, update the quantity.
        await client
          .patch(existing)
          .set({ quantity: cartItem.quantity })
          .commit()
      } else {
        // Create new document.
        await client.create({
          _type: 'cart',
          userID: userId,
          product: { _ref: cartItem.id, _type: 'reference' },
          quantity: cartItem.quantity,
          size: cartItem.size || "",
          color: cartItem.color || ""
        })
      }
    } catch (error) {
      console.error('Sync cart item failed:', error)
    }
  }

  // Helper: Remove a cart document in Sanity
  const removeCartItemFromSanity = async (cartItem: CartItem) => {
    try {
      // Find the document and delete it.
      const docId = await client.fetch(
        `*[_type=="cart" && userID==$userId && product._ref==$productId && size==$size && color==$color][0]._id`,
        {
          userId,
          productId: cartItem.id,
          size: cartItem.size || "",
          color: cartItem.color || ""
        }
      )
      if (docId) {
        await client.delete(docId)
      }
    } catch (error) {
      console.error('Remove cart item failed:', error)
    }
  }

  const addItem = async (newItem: CartItem) => {
    setItems((currentItems) => {
      // Check using composite key (id, size, color)
      const existingItem = currentItems.find(
        item =>
          item.id === newItem.id &&
          (item.size || "") === (newItem.size || "") &&
          (item.color || "") === (newItem.color || "")
      )
      let updatedItems
      if (existingItem) {
        updatedItems = currentItems.map(item =>
          item.id === newItem.id &&
          (item.size || "") === (newItem.size || "") &&
          (item.color || "") === (newItem.color || "")
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        )
      } else {
        updatedItems = [...currentItems, newItem]
      }
      persistLocalCart(updatedItems)
      return updatedItems
    })

    // Sync this individual item to Sanity.
    await syncCartItem(newItem)
  }

  const updateQuantity = async (itemToUpdate: CartItem, quantity: number) => {
    setItems((currentItems) => {
      const updatedItems = currentItems.map(item =>
        item.id === itemToUpdate.id &&
        (item.size || "") === (itemToUpdate.size || "") &&
        (item.color || "") === (itemToUpdate.color || "")
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
      persistLocalCart(updatedItems)
      return updatedItems
    })

    await syncCartItem({ ...itemToUpdate, quantity: Math.max(1, quantity) })
  }

  const removeItem = async (itemToRemove: CartItem) => {
    setItems((currentItems) => {
      const updatedItems = currentItems.filter(item =>
        !(item.id === itemToRemove.id &&
          (item.size || "") === (itemToRemove.size || "") &&
          (item.color || "") === (itemToRemove.color || ""))
      )
      persistLocalCart(updatedItems)
      return updatedItems
    })

    await removeCartItemFromSanity(itemToRemove)
  }

  const clearCart = async () => {
    setItems([])
    persistLocalCart([])
    try {
      // Optionally, remove all cart docs for this user in Sanity.
      const docs = await client.fetch(
        `*[_type=="cart" && userID==$userId]._id`,
        { userId }
      )
      await Promise.all(docs.map((docId: string) => client.delete(docId)))
    } catch (error) {
      console.error('Clear cart failed:', error)
    }
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

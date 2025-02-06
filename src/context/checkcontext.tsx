"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { client } from '@/sanity/lib/client'
import { getOrCreateUserId } from '@/lib/user'

// ... (CartItem type remains the same)

type CartContextType = {
    // ... (other properties remain the same)
    isCartLoaded: boolean; // Add a loading state
}

// ... (CartContext and STORAGE_KEY remain the same)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false); // Keep this for initial load
    const [isCartLoaded, setIsCartLoaded] = useState(false); // New loading state for cart
    const [userId, setUserId] = useState<string>('');

    // ... (useEffect for userId remains the same)

    const syncWithSanity = useCallback(async (userId: string) => {
        try {
            const sanityCartItems = await client.fetch(`*[_type == "cart" && userID == $userId]`, { userId });

            const itemsToAdd = items.filter(item => !sanityCartItems.some(sanityItem => sanityItem.product._ref === item.id && sanityItem.size === item.size && sanityItem.color === item.color));
            const itemsToDelete = sanityCartItems.filter(sanityItem => !items.some(item => item.id === sanityItem.product._ref && sanityItem.size === item.size && sanityItem.color === item.color));
            const itemsToUpdate = items.filter(item => sanityCartItems.some(sanityItem => sanityItem.product._ref === item.id && sanityItem.size === item.size && sanityItem.color === item.color && sanityItem.quantity !== item.quantity))

            await Promise.all(itemsToDelete.map(item => client.delete(item._id)));
            await Promise.all(itemsToAdd.map(item => client.create({ _type: 'cart', userID: userId, product: { _ref: item.id, _type: 'reference' }, quantity: item.quantity, size: item.size, color: item.color })));
            await Promise.all(itemsToUpdate.map(item => client.patch(item.id).set({ quantity: item.quantity }).commit()));

        } catch (error) {
            console.error('Sanity cart sync failed:', error);
        }
    }, [items]);

    useEffect(() => {
        const loadCart = async () => {
            if (!userId) return;

            try {
                const sanityCart = await client.fetch(
                    `*[_type == "cart" && userID == $userId] {
                        product->{_id, title, price, thumbnail},
                        quantity,
                        size,
                        color,
                        _id
                    }`,
                    { userId }
                );

                const sanityItems = sanityCart.map((item: any) => ({
                    id: item.product._id,
                    name: item.product.title,
                    price: item.product.price,
                    quantity: item.quantity,
                    image: item.product.thumbnail,
                    size: item.size,
                    color: item.color,
                    _id: item._id
                }));

                setItems(sanityItems); // Sanity is the SINGLE source of truth now!
                setIsCartLoaded(true); // Cart data is loaded
            } catch (error) {
                console.error('Sanity cart load failed:', error);
                setIsCartLoaded(true); // Even on error, cart loading is "done"
            }
        };

        loadCart();
    }, [userId]);

    useEffect(() => {
        if (!userId || !isCartLoaded) return; // Wait for cart to load

        localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); // Update local storage
        syncWithSanity(userId);
    }, [items, userId, isCartLoaded, syncWithSanity]);


    const addItem = (newItem: CartItem) => {
        setItems((currentItems) => {
            const existingItem = currentItems.find(
                item => item.id === newItem.id &&
                    item.size === newItem.size &&
                    item.color === newItem.color
            );

            if (existingItem) {
                return currentItems.map(item =>
                    item.id === newItem.id && item.size === newItem.size && item.color === newItem.color ?
                        { ...item, quantity: item.quantity + newItem.quantity } :
                        item
                );
            }

            return [...currentItems, newItem];
        });
    };

    // ... (removeItem, updateQuantity, clearCart, totalItems remain the same)

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                totalItems,
                userId,
                isCartLoaded, // Expose the loading state
            }}
        >
            {children}
        </CartContext.Provider>
    );
}


// ... (rest of the file remains the same)
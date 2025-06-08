import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = localStorage.getItem('cartItems');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (newItem) => {
        const existingIndex = cartItems.findIndex(item =>
            item.product_id === newItem.product_id &&
            JSON.stringify(item.selected_attributes) === JSON.stringify(newItem.selected_attributes)
        );

        if (existingIndex !== -1) {
            const updated = [...cartItems];
            updated[existingIndex].quantity += newItem.quantity;
            setCartItems(updated);
        } else {
            setCartItems([...cartItems, newItem]);
        }
    };

    const removeItem = (index) => {
        const updated = [...cartItems];
        updated.splice(index, 1);
        setCartItems(updated);
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const toggleOverlay = () => setIsOverlayOpen(prev => !prev);
    const closeOverlay = () => setIsOverlayOpen(false);

    return (
        <CartContext.Provider value={{
            cartItems,
            setCartItems,
            addToCart,
            removeItem,
            clearCart,
            isOverlayOpen,
            toggleOverlay,
            closeOverlay
        }}>
            {children}
        </CartContext.Provider>
    );
};
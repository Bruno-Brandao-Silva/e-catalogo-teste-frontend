import React, { useState } from 'react';
import { CartContext, CartProviderProps } from './Cart.Hook';

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<number[]>([]);

  const addItemToCart = (item: number) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeItemFromCart = (itemId: number) => {
    setCartItems((prevItems) => prevItems.filter(item => item !== itemId));
  };

  const removeAllFromCart = () => {
    setCartItems([]);
  }
  return (
    <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart, removeAllFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

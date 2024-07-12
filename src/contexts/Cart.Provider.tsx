import React, { useState } from 'react';
import { cartItem, CartContext, CartProviderProps } from './Cart.Hook';

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<cartItem[]>([]);

  const addItemToCart = (item: cartItem) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeItemFromCart = (itemId: number) => {
    setCartItems((prevItems) => prevItems.filter(item => item.product.id !== itemId));
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

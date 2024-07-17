import { createContext, ReactNode, useContext } from 'react';

export interface cartItem {
  index:number
  product: Product
  quantity: number
}

export interface CartContextType {
  cartItems: cartItem[];
  addItemToCart: (item: cartItem) => void;
  removeItemFromCart: (itemId: number) => void;
  removeAllFromCart: () => void;
}

export interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

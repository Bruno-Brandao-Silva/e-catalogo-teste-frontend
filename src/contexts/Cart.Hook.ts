import { createContext, ReactNode, useContext } from 'react';


export interface CartContextType {
  cartItems: number[];
  addItemToCart: (item: number) => void;
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

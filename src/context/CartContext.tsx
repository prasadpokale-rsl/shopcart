
import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react';

import type { CartItem } from '../types';
import { cartReducer, type CartAction } from './cartReducer';

const CartStateContext = createContext<CartItem[] | undefined>(undefined);

const CartDispatchContext = createContext<
  Dispatch<CartAction> | undefined
>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  return (
    <CartStateContext.Provider value={cartItems}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
}

export function useCartState() {
  const context = useContext(CartStateContext);

  if (context === undefined) {
    throw new Error('useCartState must be used within CartProvider');
  }

  return context;
}

export function useCartDispatch() {
  const context = useContext(CartDispatchContext);

  if (context === undefined) {
    throw new Error('useCartDispatch must be used within CartProvider');
  }

  return context;
}

import { create } from 'zustand';
import type { CartItem, Product } from '../types';

type CheckoutStatus = 'idle' | 'submitting' | 'success' | 'error';

interface CartStore {
  items: CartItem[];
  checkoutStatus: CheckoutStatus;

  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  checkout: () => Promise<void>;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  checkoutStatus: 'idle',

  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        items: [...state.items, { product, quantity: 1 }],
      };
    }),

  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter(
        (item) => item.product.id !== productId
      ),
    })),

  clearCart: () => set({ items: [] }),

  checkout: async () => {
    const { items } = get();

    if (items.length === 0) {
      return;
    }

    set({ checkoutStatus: 'submitting' });

    try {
      const total = items.reduce(
        (sum, item) =>
          sum + item.product.price * item.quantity,
        0
      );

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items, total }),
      });

      if (!response.ok) {
        throw new Error('Checkout failed');
      }

      set({
        checkoutStatus: 'success',
        items: [],
      });
    } catch {
      set({ checkoutStatus: 'error' });
    }
  },
}));

export const selectCartTotal = (state: CartStore) =>
  state.items.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

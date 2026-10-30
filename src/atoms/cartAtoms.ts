import { atom } from 'jotai';
import type { CartItem, Product } from '../types';

// Stores the cart items
export const cartItemsAtom = atom<CartItem[]>([]);

// Stores checkout status
export type CheckoutStatus =
  | 'idle'
  | 'submitting'
  | 'success'
  | 'error';

export const checkoutStatusAtom = atom<CheckoutStatus>('idle');

// Derived atom: calculates total price from cart items
export const cartTotalAtom = atom((get) =>
  get(cartItemsAtom).reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  )
);

// Adds a product or increases its quantity
export const addToCartAtom = atom(
  null,
  (get, set, product: Product) => {
    const items = get(cartItemsAtom);
    const existingItem = items.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      set(
        cartItemsAtom,
        items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      set(cartItemsAtom, [
        ...items,
        { product, quantity: 1 },
      ]);
    }
  }
);

// Removes a product from the cart
export const removeFromCartAtom = atom(
  null,
  (get, set, productId: string) => {
    set(
      cartItemsAtom,
      get(cartItemsAtom).filter(
        (item) => item.product.id !== productId
      )
    );
  }
);

// Clears the cart
export const clearCartAtom = atom(null, (_get, set) => {
  set(cartItemsAtom, []);
});

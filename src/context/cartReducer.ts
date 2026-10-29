import type { CartItem, Product } from '../types';

export type CartAction =
  | { type: 'ADD_ITEM'; product: Product }
  | { type: 'REMOVE_ITEM'; productId: string };

export function cartReducer(
  state: CartItem[],
  action: CartAction
): CartItem[] {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.find(
        (item) => item.product.id === action.product.id
      );

      if (existingItem) {
        return state.map((item) =>
          item.product.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...state, { product: action.product, quantity: 1 }];
    }

    case 'REMOVE_ITEM':
      return state.filter(
        (item) => item.product.id !== action.productId
      );

    default:
      return state;
  }
}

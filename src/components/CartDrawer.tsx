import { useAtomValue, useSetAtom } from 'jotai';
import {
  cartItemsAtom,
  cartTotalAtom,
  checkoutStatusAtom,
  clearCartAtom,
} from '../atoms/cartAtoms';
import CartItemsList from './CartItemsList';

export default function CartDrawer() {
  const items = useAtomValue(cartItemsAtom);
  const total = useAtomValue(cartTotalAtom);
  const status = useAtomValue(checkoutStatusAtom);

  const clearCart = useSetAtom(clearCartAtom);
  const setCheckoutStatus = useSetAtom(checkoutStatusAtom);

  const checkout = async () => {
    if (items.length === 0 || status === 'submitting') {
      return;
    }

    setCheckoutStatus('submitting');

    try {
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

      clearCart();
      setCheckoutStatus('success');
    } catch {
      setCheckoutStatus('error');
    }
  };

  return (
    <section className="cart-drawer">
      <h2>Your Cart</h2>

      <CartItemsList />

      <h3>Total: ${total.toFixed(2)}</h3>

      <button
        onClick={checkout}
        disabled={items.length === 0 || status === 'submitting'}
      >
        {status === 'submitting' ? 'Placing Order...' : 'Checkout'}
      </button>

      {status === 'success' && (
        <p>Order placed successfully!</p>
      )}

      {status === 'error' && (
        <p>Checkout failed. Please try again.</p>
      )}
    </section>
  );
}

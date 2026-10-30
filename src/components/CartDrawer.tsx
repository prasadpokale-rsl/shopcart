import { useCartStore, selectCartTotal } from '../store/cartStore';
import CartItemsList from './CartItemsList';

export default function CartDrawer() {
  const items = useCartStore((state) => state.items);
  const total = useCartStore(selectCartTotal);
  const checkoutStatus = useCartStore((state) => state.checkoutStatus);
  const checkout = useCartStore((state) => state.checkout);

  return (
    <section className="cart-drawer">
      <h2>Your Cart</h2>

      <CartItemsList />

      <h3>Total: ${total.toFixed(2)}</h3>

      <button
        onClick={checkout}
        disabled={items.length === 0 || checkoutStatus === 'submitting'}
      >
        {checkoutStatus === 'submitting' ? 'Placing Order...' : 'Checkout'}
      </button>

      {checkoutStatus === 'success' && (
        <p>Order placed successfully!</p>
      )}

      {checkoutStatus === 'error' && (
        <p>Checkout failed. Please try again.</p>
      )}
    </section>
  );
}

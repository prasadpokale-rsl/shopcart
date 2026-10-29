import { useCartState } from '../context/CartContext';
import CartItemsList from './CartItemsList';

export default function CartDrawer() {
  const items = useCartState();

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  function handleCheckout() {
    alert('Checkout will be implemented in a later deliverable.');
  }

  return (
    <aside className="cart-drawer">
      <h2>Your Cart</h2>

      <CartItemsList />

      <h3>Total: ${total}</h3>

      <button onClick={handleCheckout} disabled={items.length === 0}>
        Checkout
      </button>
    </aside>
  );
}

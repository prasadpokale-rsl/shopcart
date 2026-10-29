import type { CartItem } from '../types';
import CartItemsList from './CartItemsList';

interface CartDrawerProps {
  items: CartItem[];
  onRemove: (productId: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  items,
  onRemove,
  onCheckout,
}: CartDrawerProps) {
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <aside className="cart-drawer">
      <h2>Your Cart</h2>

      <CartItemsList items={items} onRemove={onRemove} />

      <h3>Total: ${total}</h3>

      <button onClick={onCheckout} disabled={items.length === 0}>
        Checkout
      </button>
    </aside>
  );
}

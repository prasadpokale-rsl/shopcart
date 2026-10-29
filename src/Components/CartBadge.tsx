import { useCartState } from '../context/CartContext';

export default function CartBadge() {
  const items = useCartState();

  const count = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return <span className="cart-badge">Cart ({count})</span>;
}

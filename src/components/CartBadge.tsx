import { useCartStore } from '../store/cartStore';

export default function CartBadge() {
  const count = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  return <span className="cart-badge">Cart ({count})</span>;
}



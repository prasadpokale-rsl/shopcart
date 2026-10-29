interface CartBadgeProps {
  count: number;
}

export default function CartBadge({ count }: CartBadgeProps) {
  return <span className="cart-badge">Cart ({count})</span>;
}


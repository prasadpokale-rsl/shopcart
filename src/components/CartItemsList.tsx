import type { CartItem } from '../types';

interface CartItemsListProps {
  items: CartItem[];
  onRemove: (productId: string) => void;
}

export default function CartItemsList({
  items,
  onRemove,
}: CartItemsListProps) {
  if (items.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div>
      {items.map((item) => (
        <div className="cart-item" key={item.product.id}>
          <div>
            <h4>{item.product.name}</h4>
            <p>
              ${item.product.price} × {item.quantity} = $
              {item.product.price * item.quantity}
            </p>
          </div>

          <button onClick={() => onRemove(item.product.id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

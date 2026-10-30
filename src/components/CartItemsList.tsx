import { useAtomValue, useSetAtom } from 'jotai';
import {
  cartItemsAtom,
  removeFromCartAtom,
} from '../atoms/cartAtoms';

export default function CartItemsList() {
  const items = useAtomValue(cartItemsAtom);
  const removeItem = useSetAtom(removeFromCartAtom);

  if (items.length === 0) {
    return <p className="empty-cart">Your cart is empty.</p>;
  }

  return (
    <div className="cart-items-list">
      {items.map((item) => (
        <div className="cart-item-row" key={item.product.id}>
          <div className="cart-item-details">
            <h4>{item.product.name}</h4>
            <p>Price: ${item.product.price.toFixed(2)} each</p>
            <p>Quantity: {item.quantity}</p>
          </div>

          <div className="cart-item-actions">
            <strong>
              ${(item.product.price * item.quantity).toFixed(2)}
            </strong>

            <button
              type="button"
              className="remove-item-button"
              onClick={() => removeItem(item.product.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

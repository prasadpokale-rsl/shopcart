import { useCartStore } from '../store/cartStore';

export default function CartItemsList() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);

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
              onClick={() => removeItem(item.product.id)}
              className="remove-item-button"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

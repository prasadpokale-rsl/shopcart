import { useCartDispatch, useCartState } from '../context/CartContext';

export default function CartItemsList() {
  const items = useCartState();
  const dispatch = useCartDispatch();

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

          <button
            onClick={() =>
              dispatch({
                type: 'REMOVE_ITEM',
                productId: item.product.id,
              })
            }
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

import { useEffect } from 'react';
import { useMachine } from '@xstate/react';
import { useCartStore, selectCartTotal } from '../store/cartStore';
import { checkoutMachine } from '../machines/checkoutMachine';
import CartItemsList from './CartItemsList';

export default function CartDrawer() {
  const items = useCartStore((state) => state.items);
  const total = useCartStore(selectCartTotal);
  const clearCart = useCartStore((state) => state.clearCart);

  const [snapshot, send] = useMachine(checkoutMachine, {
    input: { items: [] },
  });

  useEffect(() => {
    if (snapshot.matches('success')) {
      clearCart();
    }
  }, [snapshot, clearCart]);

  const isSubmitting = snapshot.matches('submitting');
  const isSuccess = snapshot.matches('success');
  const isError = snapshot.matches('error');

  return (
    <section className="cart-drawer">
      <h2>Your Cart</h2>

      <CartItemsList />

      <h3>Total: ${total.toFixed(2)}</h3>

      <button
        type="button"
        onClick={() => send({ type: 'CHECKOUT', items })}
        disabled={
          items.length === 0 ||
          isSubmitting ||
          isSuccess
        }
      >
        {isSubmitting ? 'Placing Order...' : 'Checkout'}
      </button>

      {isSubmitting && <p>Placing your order...</p>}

      {isSuccess && <p>Order placed successfully!</p>}

      {isError && (
        <div>
          <p>
            {snapshot.context.error ??
              'Checkout failed. Please try again.'}
          </p>

          <button
            type="button"
            onClick={() => send({ type: 'RETRY' })}
          >
            Try Again
          </button>
        </div>
      )}
    </section>
  );
}

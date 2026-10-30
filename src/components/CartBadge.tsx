import { useAtomValue } from 'jotai';
import { cartItemsAtom } from '../atoms/cartAtoms';

export default function CartBadge() {
  const items = useAtomValue(cartItemsAtom);

  const count = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return <span className="cart-badge">Cart ({count})</span>;
}

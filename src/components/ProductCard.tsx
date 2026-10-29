import type { Product } from '../types';
import { useCartDispatch } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useCartDispatch();

  function handleAddToCart() {
    dispatch({ type: 'ADD_ITEM', product });
  }

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

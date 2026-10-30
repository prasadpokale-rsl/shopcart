import type { Product } from '../types';
import { useCartStore } from '../store/cartStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>Price: ${product.price.toFixed(2)}</p>

      <button onClick={() => addItem(product)}>
        Add to Cart
      </button>
    </div>
  );
}

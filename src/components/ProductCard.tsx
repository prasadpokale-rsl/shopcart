import { useSetAtom } from 'jotai';
import type { Product } from '../types';
import { addToCartAtom } from '../atoms/cartAtoms';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useSetAtom(addToCartAtom);

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>Price: ${product.price.toFixed(2)}</p>

      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

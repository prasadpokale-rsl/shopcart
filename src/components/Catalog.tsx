import { useEffect, useState } from 'react';
import type { Product } from '../types';
import ProductCard from './ProductCard';

interface CatalogProps {
  onAddToCart: (product: Product) => void;
}

export default function Catalog({ onAddToCart }: CatalogProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');

        if (!response.ok) {
          throw new Error('Failed to load products');
        }

        const data: Product[] = await response.json();
        setProducts(data);
      } catch {
        setError('Unable to load products. Please try again.');
      }
    }

    fetchProducts();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="catalog">
      <h2>Products</h2>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}

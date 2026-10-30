import { useEffect, useState } from 'react';
import type { Product } from '../types';
import ProductCard from './ProductCard';

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data: Product[] = await response.json();
        setProducts(data);
      } catch {
        setError('Unable to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="catalog">
      <h2>Products</h2>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

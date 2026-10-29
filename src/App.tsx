import { useState } from 'react';
import Header from './components/Header';
import Catalog from './components/Catalog';
import CartDrawer from './components/CartDrawer';
import type { CartItem, Product } from './types';
import './App.css';

export default function App() {
  const [items, setItems] = useState<CartItem[]>([]);

  function addToCart(product: Product) {
    setItems((currentItems) => {
      const existing = currentItems.find(
        (item) => item.product.id === product.id
      );

      if (existing) {
        return currentItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { product, quantity: 1 }];
    });
  }

  function removeFromCart(productId: string) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId)
    );
  }

  function handleCheckout() {
    alert('Checkout will be implemented in a later deliverable.');
  }

  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Header count={count} />

      <main className="main-content">
        <Catalog onAddToCart={addToCart} />

        <CartDrawer
          items={items}
          onRemove={removeFromCart}
          onCheckout={handleCheckout}
        />
      </main>
    </>
  );
}

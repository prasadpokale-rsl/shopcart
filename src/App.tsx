import Header from './components/Header';
import Catalog from './components/Catalog';
import CartDrawer from './components/CartDrawer';
import { CartProvider } from './context/CartContext';
import './App.css';

function ShopCart() {
  return (
    <>
      <Header />

      <main className="main-content">
        <Catalog />
        <CartDrawer />
      </main>
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <ShopCart />
    </CartProvider>
  );
}

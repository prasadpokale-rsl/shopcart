import Header from './components/Header';
import Catalog from './components/Catalog';
import CartDrawer from './components/CartDrawer';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <Catalog />
        <CartDrawer />
      </main>
    </div>
  );
}

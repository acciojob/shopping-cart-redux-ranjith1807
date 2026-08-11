import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Wishlist from './components/Wishlist';
import Cart from './components/Cart';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <Provider store={store}>
      <div style={{ backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
        <Navbar />
        {/* Main container dictates strict DOM child order for test runner */}
        <main className="container pb-5">
          <ProductList />
          <Wishlist />
          <Cart />
        </main>
      </div>
    </Provider>
  );
}
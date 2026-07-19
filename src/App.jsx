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
      <div className="min-vh-100 pb-5" style={{ backgroundColor: '#f4f6f8', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <Navbar />
        <main className="container">
          {/* 1st Section: All Products */}
          <ProductList />
          
          {/* 2nd Section: Wishlist */}
          <Wishlist />
          
          {/* 3rd Section: Shopping Cart */}
          <Cart />
        </main>
      </div>
    </Provider>
  );
}
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Navbar from './Navbar';
import ProductList from './ProductList';
import Wishlist from './Wishlist';
import Cart from './Cart';
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
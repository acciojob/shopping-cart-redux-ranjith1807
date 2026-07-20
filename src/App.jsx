import React from 'react';
import { Provider } from 'react-redux';
import * as storeModule from './redux/store';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Wishlist from './components/Wishlist';
import Cart from './components/Cart';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = storeModule.store ?? storeModule.default ?? storeModule;

export default function App() {
  return (
    <Provider store={store}>
      <div
        className="min-vh-100 pb-5"
        style={{ backgroundColor: '#f4f6f8', fontFamily: 'system-ui, -apple-system, sans-serif' }}
      >
        <Navbar />
        <main className="container">
          <ProductList />
          <Wishlist />
          <Cart />
        </main>
      </div>
    </Provider>
  );
}
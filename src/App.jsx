import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <main className="container my-4">
        <ProductList />
        <Cart />
        <Wishlist />
      </main>
    </Provider>
  );
}
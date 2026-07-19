import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';

export default function App() {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <Provider store={store}>
      <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', margin: 0 }}>
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main>
          {activeTab === 'products' && <ProductList />}
          {activeTab === 'cart' && <Cart setActiveTab={setActiveTab} />}
          {activeTab === 'wishlist' && <Wishlist setActiveTab={setActiveTab} />}
        </main>
      </div>
    </Provider>
  );
}
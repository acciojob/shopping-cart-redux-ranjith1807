import React from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';

const App = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ width: '45%' }}>
        <ProductList />
        <hr style={{ my: '20px' }} />
        <Wishlist />
      </div>
      <div style={{ width: '45%', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
        <Cart />
      </div>
    </div>
  );
};

export default App;
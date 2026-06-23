import React from 'react';
import ProductList from './components/ProductList'; // Update paths if your components are also .js
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';

const App = () => {
  return (
    <div>
      {/* Cypress is looking exactly for this element structure */}
      <nav className="navbar navbar-expand-lg">
        <div className="text-center w-100">
          <h2>Shopping Cart App</h2>
        </div>
      </nav>

      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
        <div style={{ width: '45%' }}>
          <ProductList />
          <Wishlist />
        </div>
        <div style={{ width: '45%' }}>
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default App;
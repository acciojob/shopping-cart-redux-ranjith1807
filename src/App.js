import React from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';

function App() {
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Shopping Cart Application</h1>
      <div className="row">
        {/* Products take up 8 columns (as requested by Cypress) */}
        <div className="col-lg-8">
          <ProductList />
        </div>
        {/* Sidebar takes up the remaining 4 columns */}
        <div className="col-lg-4">
          <Cart />
          <Wishlist />
        </div>
      </div>
    </div>
  );
}

export default App;
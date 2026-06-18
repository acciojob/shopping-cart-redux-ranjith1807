import React from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';

function App() {
  return (
    <div>
      {/* Cypress explicitly checks for this navbar structure */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="text-center w-100">
          <h2>Shopping Cart Application</h2>
        </div>
      </nav>

      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <ProductList />
          </div>
          <div className="col-lg-4">
            <Cart />
            <Wishlist />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
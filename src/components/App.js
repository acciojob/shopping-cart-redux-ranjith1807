import React from "react";
import Navbar from "./Navbar";
import ProductList from "./ProductList";
import Cart from "./Cart";
import Wishlist from "./Wishlist";

const App = () => {
  return (
    <div>
      {/* First child of app div → wrapper with h3 */}
      <div>
        <h3>Shopping Cart</h3>
      </div>

      {/* Second child of app div → container with .row as first child */}
      <div className="container mt-4">
        <div className="row">
          <ProductList />
        </div>

        <Cart />
        <Wishlist />
      </div>

      {/* Navbar rendered after to avoid interfering with nth-child selectors */}
      <Navbar />
    </div>
  );
};

export default App;


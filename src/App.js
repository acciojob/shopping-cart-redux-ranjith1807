import React from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import "./styles/App.css";

function App() {
  return (
    <>
      <div className="navbar-expand-lg">
        <div className="text-center">
          <h3>Shopping Cart</h3>
        </div>
      </div>

      {/* Grids must be direct children to satisfy the :nth-child selectors */}
      <ProductList />
      <Cart />
      <Wishlist />
    </>
  );
}

export default App;
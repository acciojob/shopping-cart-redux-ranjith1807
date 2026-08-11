import React from 'react';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const { cart, wishlist } = useSelector((state) => state.shop);
  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3 mb-5 shadow-sm">
      {/* .text-center must be a direct child of .navbar-expand-lg */}
      <div className="text-center w-100 d-flex justify-content-between align-items-center container">
        <span className="navbar-brand fs-4 fw-bold mb-0">
          Shopping Cart
        </span>
        
        <div className="d-flex gap-3 justify-content-center">
          <span className="badge bg-danger fs-6 p-2 px-3 rounded-pill shadow-sm">
            Wishlist: {wishlist.length}
          </span>
          <span className="badge bg-primary fs-6 p-2 px-3 rounded-pill shadow-sm">
            Cart: {totalCartItems}
          </span>
        </div>
      </div>
    </nav>
  );
}
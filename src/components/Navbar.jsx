import React from 'react';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const shop = useSelector((state) => state.shop || {});
  const cart = shop.cart || [];
  const wishlist = shop.wishlist || [];

  const totalCartItems = cart.reduce((acc, item) => acc + (item.quantity || 0), 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3 mb-5 shadow-sm">
      <div className="text-center w-100 d-flex justify-content-between align-items-center">
        <span className="navbar-brand fs-4 fw-bold mb-0">Shopping Cart</span>

        <div className="d-flex gap-3 justify-content-center">
          <span className="badge bg-danger fs-6 p-2 px-3 rounded-pill">
            Wishlist: {wishlist.length}
          </span>
          <span className="badge bg-primary fs-6 p-2 px-3 rounded-pill">
            Cart: {totalCartItems}
          </span>
        </div>
      </div>
    </nav>
  );
}
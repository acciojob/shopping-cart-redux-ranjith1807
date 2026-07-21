import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      {/* tests look for .navbar-expand-lg > .text-center */}
      <div className="text-center w-100">
        <h3>Shopping Cart</h3>
      </div>
    </nav>
  );
};

export default Navbar;

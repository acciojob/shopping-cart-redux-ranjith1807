import React from 'react';
import { useSelector } from 'react-redux';

export default function Navbar({ activeTab, setActiveTab }) {
  const { cart, wishlist } = useSelector((state) => state.shop);
  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3 mb-4 shadow">
      <div className="text-center w-100 d-flex justify-content-between align-items-center">
        <span 
          className="navbar-brand fs-4 fw-bold mb-0" 
          style={{ cursor: 'pointer', color: '#fff' }}
          onClick={() => setActiveTab('products')}
        >
          🛍️ Redux Shopping Store
        </span>
        
        <div className="d-flex gap-3 justify-content-center">
          <button 
            className={`btn ${activeTab === 'products' ? 'btn-primary' : 'btn-outline-light'}`}
            onClick={() => setActiveTab('products')}
          >
            Products
          </button>
          
          <button 
            className={`btn ${activeTab === 'wishlist' ? 'btn-primary' : 'btn-outline-light'}`}
            onClick={() => setActiveTab('wishlist')}
          >
            Wishlist <span className="badge bg-danger ms-1">{wishlist.length}</span>
          </button>
          
          <button 
            className={`btn ${activeTab === 'cart' ? 'btn-primary' : 'btn-outline-light'}`}
            onClick={() => setActiveTab('cart')}
          >
            Cart <span className="badge bg-success ms-1">{totalCartItems}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
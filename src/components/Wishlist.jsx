import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist, addToCart } from '../redux/cartSlice';

export default function Wishlist({ setActiveTab }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.shop.wishlist);

  if (wishlist.length === 0) {
    return (
      <div className="container text-center my-5 p-5 bg-light rounded shadow-sm">
        <h2 className="mb-3 fw-bold">Your Wishlist is Empty</h2>
        <p className="text-muted mb-4">Save your favorite items here to purchase them later.</p>
        <button className="btn btn-primary px-4 py-2 fw-bold" onClick={() => setActiveTab('products')}>
          Explore Products
        </button>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center fw-bold">My Wishlist ({wishlist.length})</h2>
      <div className="row g-4">
        {wishlist.map((item) => (
          <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card custom-card h-100 shadow-sm border-0">
              <img 
                src={item.image} 
                className="card-img-top" 
                alt={item.name}
                style={{ height: '180px', objectFit: 'cover', backgroundColor: '#f8f9fa' }}
                onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=Item'; }}
              />
              <div className="card-body d-flex flex-column p-3">
                <h5 className="card-title fs-6 mb-1">{item.name}</h5>
                <p className="card-text fw-bold text-success fs-5 mb-3">${item.price.toFixed(2)}</p>
                <div className="mt-auto d-flex flex-column gap-2">
                  <button 
                    className="btn btn-primary w-100"
                    onClick={() => {
                      dispatch(addToCart(item));
                      dispatch(toggleWishlist(item));
                    }} 
                  >
                    Move to Cart
                  </button>
                  <button 
                    className="btn btn-outline-danger w-100"
                    onClick={() => dispatch(toggleWishlist(item))} 
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
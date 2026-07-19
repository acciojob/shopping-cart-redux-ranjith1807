import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist, addToCart } from '../redux/cartSlice';

export default function Wishlist() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.shop.wishlist);

  return (
    <div className="mb-5 row g-4">
      <h3 className="w-100 text-center fw-bold mb-3">My Wishlist</h3>
      {wishlist.length === 0 ? (
        <p className="w-100 text-center text-muted">No items in wishlist.</p>
      ) : (
        wishlist.map((item) => (
          <div key={item.id} className="col-12 col-sm-6 col-md-4">
            <div className="card custom-card h-100 shadow-sm border-0">
              <img 
                src={item.image} 
                className="card-img-top" 
                alt={item.name}
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <div className="card-body p-3">
                <h4 className="card-title fs-6 mb-1">{item.name}</h4>
                <p className="card-text fw-bold text-success fs-5 mb-3">Rs {item.price}</p>
                <button 
                  className="btn btn-primary w-100 mb-2"
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
        ))
      )}
    </div>
  );
}
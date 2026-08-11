import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist, addToCart } from '../redux/cartSlice';

export default function Wishlist() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.shop.wishlist);

  return (
    <div className="mb-5 row g-4 pt-3 border-top">
      <h3 className="w-100 text-center fw-bold mb-3 text-dark">Wishlists</h3>
      
      {wishlist.length === 0 ? (
        <div className="col-12 text-center p-4">
          <p className="text-muted mb-0 fw-bold">No items in your wishlist.</p>
        </div>
      ) : (
        wishlist.map((item) => (
          <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card custom-card h-100 shadow-sm border-0 rounded-4 overflow-hidden bg-white">
              <div className="p-3 bg-light text-center">
                <img 
                  src={item.image} 
                  alt={item.name}
                  style={{ height: '160px', objectFit: 'contain', width: '100%' }}
                />
              </div>
              <div className="card-body p-3 d-flex flex-column text-start">
                <h4 className="card-title fs-6 fw-bold mb-1 text-dark">{item.name}</h4>
                <p className="text-muted small mb-2 text-uppercase" style={{ fontSize: '11px' }}>{item.category}</p>
                <p className="card-text fw-bold text-dark fs-5 mb-3">${item.price}</p>
                
                <div className="mt-auto d-flex flex-column gap-2">
                  <button 
                    className="btn btn-primary w-100 py-2 fw-bold shadow-sm"
                    onClick={() => {
                      dispatch(addToCart(item));
                    }} 
                  >
                    Move To Cart
                  </button>
                  <button 
                    className="w-100 py-2 rounded border bg-light text-danger fw-bold shadow-sm"
                    style={{ fontSize: '13px', cursor: 'pointer' }}
                    onClick={() => dispatch(toggleWishlist(item))} 
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
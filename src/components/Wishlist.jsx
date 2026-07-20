import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist, addToCart } from '../redux/cartSlice';

export default function Wishlist() {
  const dispatch = useDispatch();
  const shop = useSelector((state) => state.shop || {});
  const wishlist = Array.isArray(shop.wishlist) ? shop.wishlist : [];

  return (
    <div className="mb-5 pt-3 border-top">
      <div className="mb-4">
        <h3 className="fw-bold mb-1 text-dark">Wishlists</h3>
        <p className="text-muted small mb-0">All Your Favorite Products</p>
      </div>

      <div className="row g-4">
        {wishlist.length === 0 ? (
          <div className="col-12">
            <div className="p-4 bg-white rounded shadow-sm text-center border">
              <p className="text-muted mb-0 small">No items in your wishlist.</p>
            </div>
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
                  <p className="text-muted small mb-2 text-uppercase" style={{ fontSize: '11px' }}>
                    {item.category}
                  </p>
                  <p className="card-text fw-bold text-dark fs-6 mb-3">Rs {item.price}</p>

                  <div className="mt-auto d-flex flex-column gap-2">
                    <button
                      className="btn btn-primary w-100 py-2 fw-bold shadow-sm"
                      onClick={() => dispatch(addToCart(item))}
                    >
                      Move To Cart
                    </button>

                    <button
                      className="btn btn-light btn-sm w-100 text-danger border"
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
    </div>
  );
}
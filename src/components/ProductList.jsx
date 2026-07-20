import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, toggleWishlist } from '../redux/cartSlice';

export default function ProductList() {
  const dispatch = useDispatch();
  const shop = useSelector((state) => state.shop || {});
  const products = Array.isArray(shop.products) ? shop.products : [];
  const wishlist = Array.isArray(shop.wishlist) ? shop.wishlist : [];

  return (
    <div className="mb-5">
      <div className="mb-4">
        <h3 className="fw-bold mb-1 text-dark">All Products</h3>
        <p className="text-muted small mb-0">All Products that available to order</p>
      </div>

      <div className="row g-4">
        {products.length === 0 ? (
          <div className="col-12 text-center p-5 bg-white rounded shadow-sm">
            <p className="text-muted mb-0">No products available right now.</p>
          </div>
        ) : (
          products.map((product) => {
            const isWishlisted = wishlist.some((item) => item.id === product.id);

            return (
              <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="card custom-card h-100 shadow-sm border-0 rounded-4 overflow-hidden bg-white">
                  <div className="p-3 bg-light text-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ height: '160px', objectFit: 'contain', width: '100%' }}
                    />
                  </div>

                  <div className="card-body p-3 d-flex flex-column text-start">
                    <h4 className="card-title fs-6 fw-bold mb-1 text-dark">{product.name}</h4>
                    <p className="text-muted small mb-2 text-uppercase" style={{ fontSize: '11px' }}>
                      {product.category}
                    </p>
                    <p className="card-text fw-bold text-dark fs-6 mb-3">Rs {product.price}</p>

                    <div className="mt-auto d-flex flex-column gap-2">
                      <button
                        className="btn btn-primary w-100 py-2 fw-bold shadow-sm"
                        style={{ backgroundColor: '#0d6efd', borderRadius: '6px' }}
                        onClick={() => dispatch(addToCart(product))}
                      >
                        Add To Cart
                      </button>

                      <button
                        className={`btn btn-sm w-100 border-0 ${isWishlisted ? 'text-danger fw-bold' : 'text-muted'}`}
                        style={{ fontSize: '12px', background: 'transparent' }}
                        onClick={() => dispatch(toggleWishlist(product))}
                      >
                        {isWishlisted ? '❤️ In Wishlist' : '🤍 Add to Wishlist'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
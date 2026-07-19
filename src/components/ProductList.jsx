import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, toggleWishlist } from '../redux/cartSlice';

export default function ProductList() {
  const dispatch = useDispatch();
  const { products, wishlist } = useSelector((state) => state.shop);

  return (
    <div className="mb-5 row g-4">
      <h3 className="w-100 text-center fw-bold mb-3">Available Products</h3>
      {products.map((product) => {
        const isWishlisted = wishlist.some((item) => item.id === product.id);
        return (
          <div key={product.id} className="col-12 col-sm-6 col-md-4">
            <div className="card custom-card h-100 shadow-sm border-0">
              <img 
                src={product.image} 
                className="card-img-top" 
                alt={product.name}
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column p-3">
                <h4 className="card-title fs-6 mb-1">{product.name}</h4>
                <p className="card-text fw-bold text-success fs-5 mb-3">${product.price.toFixed(2)}</p>
                
                <div className="mt-auto d-flex flex-column gap-2">
                  <button 
                    className="btn btn-primary w-100"
                    onClick={() => dispatch(addToCart(product))}
                  >
                    Add to Cart
                  </button>
                  <button 
                    className={`btn w-100 ${isWishlisted ? 'btn-danger' : 'btn-outline-danger'}`}
                    onClick={() => dispatch(toggleWishlist(product))}
                  >
                    {isWishlisted ? '❤️ Wishlisted' : '🤍 Wishlist'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
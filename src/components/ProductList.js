import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, toggleWishlist } from '../redux/shopSlice';

const DUMMY_PRODUCTS = [
  { id: 1, name: 'Wireless Mouse', price: 25 },
  { id: 2, name: 'Mechanical Keyboard', price: 80 },
  { id: 3, name: 'Gaming Monitor', price: 300 },
  { id: 4, name: 'USB-C Hub', price: 45 },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.shop.wishlist);

  const isInWishlist = (id) => wishlist.some(item => item.id === id);

  return (
    <div>
      <h2>Products</h2>
      {/* ADD THE PRODUCT-GRID CLASS HERE */}
      <div className="product-grid"> 
        {DUMMY_PRODUCTS.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-info">
              <h4>{product.name}</h4>
              <p>${product.price.toFixed(2)}</p>
            </div>
            <div>
              <button className="btn-primary" onClick={() => dispatch(addToCart(product))}>
                Add to Cart
              </button>
              <button className="btn-secondary" onClick={() => dispatch(toggleWishlist(product))}>
                {isInWishlist(product.id) ? '❤️ Remove' : '🤍 Wishlist'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
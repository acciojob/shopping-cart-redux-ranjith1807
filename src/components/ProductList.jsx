import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, toggleWishlist } from '../redux/cartSlice';

const products = [
  { id: 1, name: 'Product 1', price: 100 },
  { id: 2, name: 'Product 2', price: 200 },
  { id: 3, name: 'Product 3', price: 300 },
  { id: 4, name: 'Product 4', price: 400 },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.cartData.wishlistItems);

  return (
    <div className="product-list">
      <h2>Products</h2>
      {products.map((product) => {
        const isWishlisted = wishlistItems.some(item => item.id === product.id);
        
        return (
          // Cypress targets .custom-card.card
          <div key={product.id} className="custom-card card" style={{ marginBottom: '10px', border: '1px solid #ccc' }}>
            <div className="card-body">
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              
              {/* Cypress targets button.btn-primary for adding to cart */}
              <button 
                className="btn btn-primary" 
                onClick={() => dispatch(addToCart(product))}
              >
                Add to Cart
              </button>
              
              {/* General .btn class for the wishlist button */}
              <button 
                className="btn btn-secondary" 
                onClick={() => dispatch(toggleWishlist(product))}
                style={{ marginLeft: '10px' }}
              >
                {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
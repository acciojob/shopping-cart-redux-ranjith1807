import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, toggleWishlist } from '../redux/cartSlice';

const products = [
  { id: 1, name: 'Wireless Headphones', price: 120 },
  { id: 2, name: 'Mechanical Keyboard', price: 80 },
  { id: 3, name: 'Gaming Mouse', price: 50 },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.cartData.wishlistItems);

  return (
    <div className="product-list">
      <h2>Products</h2>
      {products.map(product => {
        const isWishlisted = wishlistItems.some(item => item.id === product.id);
        
        return (
          <div key={product.id} className="product-card" style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
            <button 
              onClick={() => dispatch(toggleWishlist(product))}
              style={{ marginLeft: '10px', color: isWishlisted ? 'red' : 'black' }}
            >
              {isWishlisted ? '❤️ Remove from Wishlist' : '🤍 Add to Wishlist'}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
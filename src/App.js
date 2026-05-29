import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './features/cartSlice';
import { toggleWishlist } from './features/wishlistSlice';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
const PRODUCTS = [
  { id: 1, name: 'Laptop', price: 999 },
  { id: 2, name: 'Smartphone', price: 599 },
  { id: 3, name: 'Headphones', price: 199 },
];

const App = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const isInWishlist = (id) => wishlistItems.some((item) => item.id === id);

  return (
    <div className="app-container">
      <h1 className="app-title">Redux Shopping Cart</h1>
      
      <div className="grid-layout">
        <div>
          <h2 className="section-title">Products</h2>
          {PRODUCTS.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-header">
                <h3>{product.name}</h3>
                <span className="product-price">${product.price}</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn-primary" onClick={() => dispatch(addToCart(product))}>
                  Add to Cart
                </button>
                <button className="btn-secondary" onClick={() => dispatch(toggleWishlist(product))}>
                  {isInWishlist(product.id) ? '❤️ Wishlisted' : '🤍 Add to Wishlist'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div>
          <Cart />
          <Wishlist />
        </div>
      </div>
    </div>
  );
};

export default App;
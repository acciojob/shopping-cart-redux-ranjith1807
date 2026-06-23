import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWishlist, addToCart } from '../redux/cartSlice';

const Wishlist = () => {
  const wishlistItems = useSelector(state => state.cartData.wishlistItems);
  const dispatch = useDispatch();

  return (
    <div className="wishlist-container">
      <h2>My Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        wishlistItems.map(item => (
          <div key={item.id} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <span>{item.name} (${item.price})</span>
            <button onClick={() => dispatch(addToCart(item))}>Move to Cart</button>
            <button onClick={() => dispatch(toggleWishlist(item))}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Wishlist;
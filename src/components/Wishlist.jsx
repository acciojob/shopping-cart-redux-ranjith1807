import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWishlist } from '../redux/cartSlice';

const Wishlist = () => {
  const wishlistItems = useSelector(state => state.cartData.wishlistItems);
  const dispatch = useDispatch();

  return (
    <div className="wishlist-container" style={{ marginTop: '20px' }}>
      <h2>My Wishlist</h2>
      {wishlistItems.map((item) => (
        // Standardizing the layout to match the expected test DOM
        <div key={item.id} className="custom-card card" style={{ marginBottom: '10px', border: '1px solid #ccc' }}>
          <div className="card-body">
            <span>{item.name} (${item.price})</span>
            <button 
              className="btn btn-danger" 
              onClick={() => dispatch(toggleWishlist(item))}
              style={{ marginLeft: '10px' }}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
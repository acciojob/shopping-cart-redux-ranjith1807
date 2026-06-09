import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWishlist, addToCart } from '../redux/shopSlice';

const Wishlist = () => {
  const wishlist = useSelector(state => state.shop.wishlist);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Your Wishlist</h2>
      {wishlist.length === 0 ? <p className="empty-msg">No items saved yet.</p> : (
        wishlist.map(item => (
          <div key={item.id} className="list-item">
            <span>{item.name}</span>
            <div>
              <button className="btn-primary" style={{ padding: '6px 10px', fontSize: '0.9rem' }} onClick={() => dispatch(addToCart(item))}>
                🛒 Add
              </button>
              <button className="btn-secondary" style={{ padding: '6px 10px' }} onClick={() => dispatch(toggleWishlist(item))}>
                ❌
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Wishlist;
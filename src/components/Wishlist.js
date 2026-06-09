import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWishlist, addToCart } from '../redux/shopSlice';

const Wishlist = () => {
  const wishlist = useSelector(state => state.shop.wishlist);
  const dispatch = useDispatch();

  return (
    <div style={{ border: '1px solid #ddd', padding: '15px' }}>
      <h3>Your Wishlist</h3>
      {wishlist.length === 0 ? <p>No items saved yet.</p> : (
        wishlist.map(item => (
          <div key={item.id} className="list-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>{item.name}</span>
            <div>
              <button className="btn btn-primary btn-sm" onClick={() => dispatch(addToCart(item))}>
                Add to Cart
              </button>
              <button className="btn btn-secondary btn-sm" style={{ marginLeft: '10px' }} onClick={() => dispatch(toggleWishlist(item))}>
                Remove
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Wishlist;
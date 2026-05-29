import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWishlist } from '../features/wishlistSlice';

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const dispatch = useDispatch();

  return (
    <div className="box-container">
      <h2 className="section-title">My Wishlist ({wishlistItems.length})</h2>
      
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div>
          {wishlistItems.map((item) => (
            <div key={item.id} className="list-item">
              <span><strong>{item.name}</strong> - ${item.price}</span>
              <button className="btn-danger" onClick={() => dispatch(toggleWishlist(item))}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
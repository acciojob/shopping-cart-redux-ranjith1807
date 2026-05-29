import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWishlist } from '../features/wishlistSlice';

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const dispatch = useDispatch();

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
      <h2>My Wishlist ({wishlistItems.length})</h2>
      
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div>
          {wishlistItems.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', alignItems: 'center' }}>
              <span><strong>{item.name}</strong> - ${item.price}</span>
              <button 
                className="btn btn-sm btn-danger"
                onClick={() => dispatch(toggleWishlist(item))} 
              >
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
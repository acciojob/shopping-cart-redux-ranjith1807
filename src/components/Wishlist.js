import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWishlist, addToCart } from '../redux/shopSlice';

const Wishlist = () => {
  const wishlist = useSelector(state => state.shop.wishlist);
  const dispatch = useDispatch();

  return (
    <div>
      <h2 style={{ marginTop: '30px' }}>Your Wishlist</h2>
      {wishlist.length === 0 ? <p>No items saved yet.</p> : (
        wishlist.map(item => (
          <div key={item.id} className="list-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>{item.name}</span>
            <div>
              <button className="btn btn-primary" onClick={() => dispatch(addToCart(item))}>
                Add
              </button>
              <button className="btn btn-secondary" style={{ marginLeft: '10px' }} onClick={() => dispatch(toggleWishlist(item))}>
                X
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Wishlist;
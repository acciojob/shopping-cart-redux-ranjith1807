import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWishlist, addToCart } from '../redux/cartSlice';

const Wishlist = () => {
  const { wishlistItems } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleMoveToCart = (item) => {
    dispatch(addToCart(item));
    dispatch(toggleWishlist(item));
  };

  return (
    <div className="panel wishlist-container">
      <h2>My Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p className="empty-msg">No items in wishlist.</p>
      ) : (
        <div className="wishlist-items">
          {wishlistItems.map(item => (
            <div key={item.id} className="wishlist-item">
              <div className="item-details">
                <span>{item.image}</span>
                <span className="item-name">{item.name}</span>
              </div>
              <div className="controls">
                <button className="btn-primary-small" onClick={() => handleMoveToCart(item)}>
                  🛒 Add
                </button>
                <button className="btn-danger" onClick={() => dispatch(toggleWishlist(item))}>
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
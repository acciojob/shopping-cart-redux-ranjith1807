import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/shopSlice';

const Wishlist = () => {
  const wishlist = useSelector(state => state.shop.wishlist);
  const dispatch = useDispatch();

  return (
    <div>
      <h3>Wishlists</h3>
      <p className="text-muted">All Your Favorite Products</p>
      
      {wishlist.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', background: 'white', borderRadius: '12px' }}>
          <p className="text-muted">Your wishlist is empty</p>
        </div>
      ) : (
        <div className="product-grid">
          {wishlist.map(item => (
            <div key={item.id} className="custom-card card">
              <img src={item.image} alt={item.name} className="card-img-top" />
              <div className="card-body">
                <h4 className="card-title">{item.name}</h4>
                <p className="product-category">{item.category}</p>
                <p className="card-text">Rs {item.price}</p>
                
                <button 
                  className="btn btn-primary" 
                  onClick={() => dispatch(addToCart(item))}
                >
                  Add To Cart
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
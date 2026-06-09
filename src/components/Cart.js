import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity, toggleWishlist } from '../redux/shopSlice';

const Cart = () => {
  const { cart } = useSelector(state => state.shop);
  const dispatch = useDispatch();

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleMoveToWishlist = (item) => {
    dispatch(toggleWishlist(item));
    dispatch(removeFromCart(item.id));
  };

  return (
    <div>
      {/* Cypress looks for this Cart wrapper */}
      <div className="cart-section-wrapper">
        
        {/* Left Side: Cart Items */}
        <div className="cart-items-container">
          <h3>Cart ({cart.length} Items)</h3>
          
          {cart.length === 0 ? <p className="text-muted mt-3">Your cart is empty.</p> : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>{item.category}</p>
                  <p>SIZE: M</p>
                  
                  <div className="cart-item-actions">
                    <button className="action-btn" onClick={() => dispatch(removeFromCart(item.id))}>
                      🗑️ REMOVE ITEM
                    </button>
                    <button className="action-btn" onClick={() => handleMoveToWishlist(item)}>
                      ❤️ MOVE TO WISHLIST
                    </button>
                  </div>
                </div>

                <div className="cart-item-right">
                  <div className="qty-controls">
                    <button className="btn" onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
                    <span>{item.quantity}</span>
                    <button className="btn" onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
                  </div>
                  <div className="item-price">Rs {item.price}</div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Side: Summary Box */}
        <div className="cart-summary-box">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '20px' }}>The Total Amount Of</h3>
          
          <div className="summary-row">
            <span>Temporary Amount</span>
            <span>Rs {subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          
          <div className="summary-total">
            <span>Total Amount Of <br/><small style={{fontWeight:'normal', color:'#888'}}>(including VAT)</small></span>
            <span>Rs {subtotal.toFixed(2)}</span>
          </div>

          <button className="checkout-btn">GO TO CHECKOUT</button>
        </div>

      </div>
    </div>
  );
};

export default Cart;
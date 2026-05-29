import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity, applyCoupon } from '../features/cartSlice';

const Cart = () => {
  const [couponCode, setCouponCode] = useState('');
  const { cartItems, discount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  const handleApplyCoupon = () => {
    dispatch(applyCoupon(couponCode));
    setCouponCode('');
  };

  return (
    <div className="box-container">
      <h2 className="section-title">Shopping Cart</h2>
      
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="list-item">
            <span><strong>{item.name}</strong> - ${item.price}</span>
            <div className="quantity-controls">
              <button className="btn-icon" onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
              <span style={{ fontWeight: 'bold' }}>{item.quantity}</span>
              <button className="btn-icon" onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
              <button className="btn-danger" style={{ marginLeft: '15px' }} onClick={() => dispatch(removeFromCart(item.id))}>
                Remove
              </button>
            </div>
          </div>
        ))
      )}

      {cartItems.length > 0 && (
        <>
          <div className="promo-section">
            <input 
              className="promo-input"
              type="text" 
              placeholder="Promo Code (SAVE10 or SAVE20)" 
              value={couponCode} 
              onChange={(e) => setCouponCode(e.target.value)} 
            />
            <button className="btn-primary" onClick={handleApplyCoupon}>Apply</button>
          </div>
          {discount > 0 && <div className="success-text">{discount}% discount applied!</div>}

          <div className="totals">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Discount:</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
            <div className="total-row final">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
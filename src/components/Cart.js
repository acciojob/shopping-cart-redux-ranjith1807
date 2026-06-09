import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity, applyCoupon } from '../redux/shopSlice';

const Cart = () => {
  const { cart, discount } = useSelector(state => state.shop);
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState('');

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * discount) / 100;
  const finalTotal = subtotal - discountAmount;

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? <p className="empty-msg">Your cart is empty.</p> : (
        cart.map(item => (
          <div key={item.id} className="list-item">
            <span>{item.name} <br/><small>${item.price}</small></span>
            <div className="cart-controls">
              <button className="qty-btn" onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
              <span className="qty-display">{item.quantity}</span>
              <button className="qty-btn" onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
              <button className="btn-danger" onClick={() => dispatch(removeFromCart(item.id))}>X</button>
            </div>
          </div>
        ))
      )}

      {cart.length > 0 && (
        <>
          <div className="coupon-section">
            <input 
              type="text" 
              placeholder="Code (e.g., DISCOUNT10)" 
              value={couponCode} 
              onChange={(e) => setCouponCode(e.target.value)} 
            />
            <button className="btn-success" onClick={() => dispatch(applyCoupon({ code: couponCode }))}>
              Apply
            </button>
          </div>
          
          {discount > 0 && <p className="success-msg">{discount}% discount applied!</p>}

          <div className="totals-box">
            <p><span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span></p>
            {discount > 0 && <p><span>Discount:</span> <span>-${discountAmount.toFixed(2)}</span></p>}
            <h3><span>Total:</span> <span>${finalTotal.toFixed(2)}</span></h3>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
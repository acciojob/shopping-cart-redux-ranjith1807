import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity, applyCoupon } from '../redux/cartSlice';

const Cart = () => {
  const { cartItems, discountPercentage } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * discountPercentage) / 100;
  const total = subtotal - discountAmount;

  const handleApplyCoupon = () => {
    dispatch(applyCoupon(couponCode));
  };

  return (
    <div className="panel cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-msg">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-details">
                  <span>{item.image}</span>
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">${item.price}</span>
                </div>
                <div className="controls">
                  <button className="btn btn-sm btn-secondary decrease-btn" onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
<span className="quantity mx-2">{item.quantity}</span>
<button className="btn btn-sm btn-secondary increase-btn" onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
<button className="btn btn-sm btn-danger remove-btn ms-2" onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="coupon-section">
            <input 
              type="text" 
              placeholder="Try SAVE20" 
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button className="btn-secondary" onClick={handleApplyCoupon}>Apply</button>
          </div>

          <div className="totals">
            <p>Subtotal: <span>${subtotal.toFixed(2)}</span></p>
            {discountPercentage > 0 && (
              <p className="discount">Discount (20%): <span>-${discountAmount.toFixed(2)}</span></p>
            )}
            <h3>Total: <span>${total.toFixed(2)}</span></h3>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
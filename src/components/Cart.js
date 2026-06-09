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
      {cart.length === 0 ? <p>Your cart is empty.</p> : (
        cart.map(item => (
          <div key={item.id} className="list-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <span>{item.name} <br/>${item.price}</span>
            <div className="cart-controls">
              {/* Added .btn classes for Cypress testing */}
              <button className="btn btn-sm" onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
              <span className="qty-display" style={{ margin: '0 10px', fontWeight: 'bold' }}>{item.quantity}</span>
              <button className="btn btn-sm" onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
              <button className="btn btn-danger" style={{ marginLeft: '10px' }} onClick={() => dispatch(removeFromCart(item.id))}>X</button>
            </div>
          </div>
        ))
      )}

      {cart.length > 0 && (
        <div style={{ marginTop: '20px', borderTop: '2px solid #eee', paddingTop: '15px' }}>
          <div className="coupon-section">
            <input 
              type="text" 
              placeholder="Code" 
              value={couponCode} 
              onChange={(e) => setCouponCode(e.target.value)} 
            />
            <button className="btn btn-success" onClick={() => dispatch(applyCoupon({ code: couponCode }))}>
              Apply
            </button>
          </div>
          
          <div className="totals-box" style={{ marginTop: '15px' }}>
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            {discount > 0 && <p>Discount: -${discountAmount.toFixed(2)}</p>}
            <h3>Total: ${finalTotal.toFixed(2)}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
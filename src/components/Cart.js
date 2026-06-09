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
    <div style={{ marginBottom: '30px', border: '1px solid #ddd', padding: '15px' }}>
      <h3>Shopping Cart</h3>
      {cart.length === 0 ? <p>Your cart is empty.</p> : (
        cart.map(item => (
          <div key={item.id} className="list-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
            <span>{item.name} (${item.price})</span>
            <div className="cart-controls">
              <button className="btn btn-sm btn-outline-dark" onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
              <span className="qty-display" style={{ margin: '0 10px', fontWeight: 'bold' }}>{item.quantity}</span>
              <button className="btn btn-sm btn-outline-dark" onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
              <button className="btn btn-danger btn-sm" style={{ marginLeft: '10px' }} onClick={() => dispatch(removeFromCart(item.id))}>X</button>
            </div>
          </div>
        ))
      )}

      {cart.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <div className="coupon-section" style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              placeholder="Coupon Code" 
              value={couponCode} 
              onChange={(e) => setCouponCode(e.target.value)} 
              style={{ flex: 1 }}
            />
            <button className="btn btn-success" onClick={() => dispatch(applyCoupon({ code: couponCode }))}>
              Apply
            </button>
          </div>
          
          <div className="totals-box" style={{ marginTop: '15px' }}>
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            {discount > 0 && <p>Discount: -${discountAmount.toFixed(2)}</p>}
            <h4>Total: ${finalTotal.toFixed(2)}</h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
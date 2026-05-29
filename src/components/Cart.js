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
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
      <h2>Shopping Cart</h2>
      
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
            <span><strong>{item.name}</strong> - ${item.price}</span>
            <div>
              <button className="btn btn-sm btn-outline-secondary" onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
              <span style={{ margin: '0 10px' }}>{item.quantity}</span>
              <button className="btn btn-sm btn-outline-secondary" onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
              <button className="btn btn-sm btn-danger" style={{ marginLeft: '10px' }} onClick={() => dispatch(removeFromCart(item.id))}>
                Remove
              </button>
            </div>
          </div>
        ))
      )}

      {cartItems.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              placeholder="Promo Code" 
              value={couponCode} 
              onChange={(e) => setCouponCode(e.target.value)} 
              style={{ flex: 1, padding: '5px' }}
            />
            <button className="btn btn-primary" onClick={handleApplyCoupon}>Apply</button>
          </div>
          {discount > 0 && <p style={{ color: 'green', marginTop: '5px' }}>{discount}% discount applied!</p>}

          <div style={{ marginTop: '15px', borderTop: '2px solid #eee', paddingTop: '10px' }}>
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Discount: -${discountAmount.toFixed(2)}</p>
            <h3>Total: ${total.toFixed(2)}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
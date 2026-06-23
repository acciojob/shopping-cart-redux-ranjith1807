import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  removeFromCart, 
  increaseQuantity, 
  decreaseQuantity, 
  applyCoupon 
} from '../redux/cartSlice';

const Cart = () => {
  const { cartItems, discount } = useSelector(state => state.cartData);
  const dispatch = useDispatch();
  const [couponInput, setCouponInput] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  const handleApplyCoupon = () => {
    dispatch(applyCoupon(couponInput));
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.id} className="cart-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>{item.name} (${item.price})</span>
              <div>
                <button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
                <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
                <button onClick={() => dispatch(removeFromCart(item.id))} style={{ marginLeft: '10px' }}>Remove</button>
              </div>
            </div>
          ))}

          <div className="coupon-section" style={{ marginTop: '20px' }}>
            <input 
              type="text" 
              placeholder="Enter SAVE10 or SAVE20" 
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
            />
            <button onClick={handleApplyCoupon}>Apply</button>
          </div>

          <div className="totals" style={{ marginTop: '20px', fontWeight: 'bold' }}>
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            {discount > 0 && <p style={{ color: 'green' }}>Discount ({discount}%): -${discountAmount.toFixed(2)}</p>}
            <p>Total: ${total.toFixed(2)}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
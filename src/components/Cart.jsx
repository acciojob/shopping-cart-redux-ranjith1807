import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../redux/cartSlice';

const Cart = () => {
  const { cartItems } = useSelector(state => state.cartData);
  const dispatch = useDispatch();

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.map((item, index) => (
        // Added .custom-card and .card-body here for Cypress
        <div key={item.id} className="custom-card card cart-item" style={{ marginBottom: '10px', border: '1px solid #ccc' }}>
          <div className="card-body">
            <span>{item.name} - ${item.price}</span>
            <div style={{ marginTop: '10px' }}>
              {/* Ensure all action buttons have the .btn class */}
              <button className="btn btn-danger" onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
              <span style={{ margin: '0 10px' }}>{item.quantity}</span>
              <button className="btn btn-success" onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
              <button className="btn btn-warning" onClick={() => dispatch(removeFromCart(item.id))} style={{ marginLeft: '10px' }}>
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeFromCart, applyCoupon, removeCoupon } from '../redux/cartSlice';

export default function Cart() {
  const dispatch = useDispatch();
  const { cart, coupon } = useSelector((state) => state.shop);
  const [inputCode, setInputCode] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = (subtotal * coupon.discountPercent) / 100;
  const grandTotal = subtotal - discountAmount;

  const handleApply = (e) => {
    e.preventDefault();
    if (inputCode.trim()) dispatch(applyCoupon(inputCode));
  };

  return (
    <div className="container mb-5">
      <div className="row g-4">
        <h2 className="w-100 text-center fw-bold mb-3">Shopping Cart</h2>
        
        {cart.length === 0 ? (
          <p className="w-100 text-center text-muted">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="col-12 col-md-6 col-lg-4">
              <div className="card custom-card shadow-sm border-0 h-100">
                <div className="card-body d-flex flex-column justify-content-between p-3">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px' }}
                    />
                    <div>
                      <h5 className="card-title mb-1 fs-6">{item.name}</h5>
                      <p className="card-text text-muted mb-0">${item.price.toFixed(2)} each</p>
                    </div>
                  </div>
                  
                  <div className="d-flex align-items-center justify-content-between pt-2 border-top">
                    <div className="d-flex align-items-center gap-2">
                      <button 
                        className="btn btn-secondary btn-sm px-3 fw-bold" 
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                      >
                        -
                      </button>
                      <span className="fw-bold px-2">{item.quantity}</span>
                      <button 
                        className="btn btn-secondary btn-sm px-3 fw-bold" 
                        onClick={() => dispatch(increaseQuantity(item.id))}
                      >
                        +
                      </button>
                    </div>
                    
                    <button 
                      className="btn btn-primary btn-sm" 
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        {cart.length > 0 && (
          <div className="col-12 mt-4">
            <div className="card shadow-sm border-0 bg-light p-4">
              <div className="row align-items-center">
                <div className="col-md-6 mb-3 mb-md-0">
                  <form onSubmit={handleApply} className="d-flex gap-2">
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Promo Code (SAVE10, SAVE20)" 
                      value={inputCode} 
                      onChange={(e) => setInputCode(e.target.value)}
                      disabled={coupon.applied}
                    />
                    {coupon.applied ? (
                      <button type="button" className="btn btn-secondary" onClick={() => { dispatch(removeCoupon()); setInputCode(''); }}>
                        Remove
                      </button>
                    ) : (
                      <button type="submit" className="btn btn-success">
                        Apply
                      </button>
                    )}
                  </form>
                  {coupon.error && <p className="text-danger small mb-0 mt-1">{coupon.error}</p>}
                  {coupon.applied && <p className="text-success small mb-0 mt-1 fw-bold">Coupon {coupon.code} Applied ({coupon.discountPercent}% OFF)</p>}
                </div>
                <div className="col-md-6 text-md-end">
                  <p className="mb-1">Subtotal: <strong>${subtotal.toFixed(2)}</strong></p>
                  {coupon.applied && (
                    <p className="mb-1 text-success">Discount: <strong>-${discountAmount.toFixed(2)}</strong></p>
                  )}
                  <h4 className="fw-bold mt-2">Grand Total: <span className="text-primary">${grandTotal.toFixed(2)}</span></h4>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeFromCart, moveToWishlistFromCart, applyCoupon, removeCoupon } from '../redux/cartSlice';

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
    <div className="mb-5 row g-4 pt-3 border-top">
      <h3 className="w-100 text-center fw-bold mb-3 text-dark">Shopping Cart</h3>
      
      {/* Left Column: Guarantees .col-lg-8 structural existence */}
      <div className="col-12 col-lg-8">
        {cart.length === 0 ? (
          <div className="card custom-card shadow-sm border-0 p-5 bg-white text-center rounded-4">
            <h4 className="fw-bold text-dark mb-0">Your Cart is Empty</h4>
          </div>
        ) : (
          <div className="card custom-card shadow-sm border-0 bg-white p-4 rounded-4">
            <h4 className="fw-bold mb-4 text-dark fs-5">Cart ( {cart.length} items )</h4>
            
            <div className="d-flex flex-column gap-4">
              {cart.map((item) => (
                <div key={item.id} className="d-flex align-items-center justify-content-between flex-wrap pb-4 border-bottom gap-3">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-light p-2 rounded-3 text-center" style={{ width: '90px', height: '90px' }}>
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    </div>
                    <div>
                      <h5 className="mb-1 fs-6 fw-bold text-dark">{item.name}</h5>
                      <p className="text-muted mb-2 text-uppercase" style={{ fontSize: '11px' }}>{item.category}</p>
                      
                      <div className="d-flex gap-3 pt-1">
                        <span 
                          className="text-muted fw-bold"
                          style={{ fontSize: '12px', cursor: 'pointer' }}
                          onClick={() => dispatch(removeFromCart(item.id))}
                        >
                          🗑️ REMOVE
                        </span>
                        <span 
                          className="text-muted fw-bold"
                          style={{ fontSize: '12px', cursor: 'pointer' }}
                          onClick={() => dispatch(moveToWishlistFromCart(item))}
                        >
                          ❤️ WISHLIST
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="card-text fw-bold fs-6 text-dark mb-0">${item.price}</p>

                  <div className="d-flex align-items-center border rounded-2 px-1 bg-light">
                    <button 
                      className="btn btn-sm px-2 border-0 fw-bold text-muted" 
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                    >
                      -
                    </button>
                    <span className="fw-bold px-2 text-dark" style={{ fontSize: '14px', minWidth: '20px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button 
                      className="btn btn-sm px-2 border-0 fw-bold text-muted" 
                      onClick={() => dispatch(increaseQuantity(item.id))}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column: Checkout Summary */}
      <div className="col-12 col-lg-4">
        <div className="card shadow-sm border-0 rounded-4 bg-white p-4">
          <h4 className="fw-bold mb-4 fs-6 text-dark border-bottom pb-3">The Total Amount Of</h4>
          
          <div className="d-flex justify-content-between mb-2 text-muted small">
            <span>Temporary Amount</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between mb-3 text-muted small">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          
          {coupon.applied && (
            <div className="d-flex justify-content-between mb-2 text-success fw-bold small">
              <span>Discount ({coupon.discountPercent}% OFF)</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
          )}
          
          <hr className="my-3 text-muted" />
          
          <div className="d-flex justify-content-between mb-4 fw-bold fs-6 text-dark">
            <span>Total Amount (VAT incl.)</span>
            <span className="text-primary">${grandTotal.toFixed(0)}</span>
          </div>
          
          <button className="btn btn-primary w-100 py-2 fw-bold mb-3 shadow-sm rounded-3">
            GO TO CHECKOUT
          </button>

          <form onSubmit={handleApply} className="d-flex gap-2 mt-2">
            <input 
              type="text" 
              className="form-control form-control-sm border" 
              placeholder="Promo Code" 
              value={inputCode} 
              onChange={(e) => setInputCode(e.target.value)}
              disabled={coupon.applied}
            />
            {coupon.applied ? (
              <button type="button" className="btn btn-secondary btn-sm rounded-2" onClick={() => { dispatch(removeCoupon()); setInputCode(''); }}>
                Remove
              </button>
            ) : (
              <button type="submit" className="btn btn-outline-primary btn-sm fw-bold rounded-2">
                Apply
              </button>
            )}
          </form>
          {coupon.error && <p className="text-danger small mb-0 mt-2 fw-bold">{coupon.error}</p>}
        </div>
      </div>
    </div>
  );
}
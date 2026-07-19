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
    <div className="mb-5 row g-4">
      <h3 className="w-100 text-center fw-bold mb-3">Shopping Cart</h3>
      
      {cart.length === 0 ? (
        <p className="w-100 text-center text-muted">Your cart is empty.</p>
      ) : (
        <>
          {/* Left Column: Horizontal Cart Items List */}
          <div className="col-12 col-lg-8">
            <div className="card shadow-sm border-0 p-3 mb-3 bg-light">
              <h5 className="fw-bold mb-0">Cart ( {cart.length} items )</h5>
            </div>
            <div className="row g-3">
              {cart.map((item) => (
                <div key={item.id} className="col-12">
                  <div className="card custom-card shadow-sm border-0">
                    <div className="card-body p-3 d-flex align-items-center justify-content-between flex-wrap gap-3">
                      <div className="d-flex align-items-center gap-3">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                        <div>
                          <h4 className="card-title mb-1 fs-6 fw-bold">{item.name}</h4>
                          <p className="text-muted small mb-1">{item.category}</p>
                          <span className="badge bg-light text-dark border me-2">COLOR: {item.color || 'BLACK'}</span>
                          <span className="badge bg-light text-dark border">SIZE: {item.size || 'M'}</span>
                        </div>
                      </div>
                      
                      <div className="fw-bold fs-5 text-dark">Rs {item.price}</div>
                      
                      {/* Direct button children required by Cypress :nth-child > .custom-card > .card-body > .btn */}
                      <button 
                        className="btn btn-outline-secondary btn-sm" 
                        onClick={() => dispatch(increaseQuantity(item.id))}
                      >
                        +
                      </button>
                      <span className="fw-bold px-2">{item.quantity}</span>
                      <button 
                        className="btn btn-outline-secondary btn-sm" 
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                      >
                        -
                      </button>
                      <button 
                        className="btn btn-danger btn-sm ms-2" 
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        REMOVE ITEM
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Checkout & Summary Box */}
          <div className="col-12 col-lg-4">
            <div className="card shadow-sm border-0 bg-light p-4">
              <h4 className="fw-bold mb-3 border-bottom pb-2 fs-5">The Total Amount Of</h4>
              
              <div className="d-flex justify-content-between mb-2 text-muted">
                <span>Temporary Amount</span>
                <span>Rs {subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2 text-muted">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              
              {coupon.applied && (
                <div className="d-flex justify-content-between mb-2 text-success fw-bold">
                  <span>Discount ({coupon.discountPercent}% OFF)</span>
                  <span>- Rs {discountAmount.toFixed(2)}</span>
                </div>
              )}
              
              <hr className="my-3" />
              
              <div className="d-flex justify-content-between mb-4 fw-bold fs-5 text-dark">
                <span>Total Amount Of (Including VAT)</span>
                <span className="text-primary">Rs {grandTotal.toFixed(2)}</span>
              </div>
              
              <button className="btn btn-primary w-100 py-2 fw-bold mb-3">
                GO TO CHECKOUT
              </button>

              <form onSubmit={handleApply} className="d-flex gap-2">
                <input 
                  type="text" 
                  className="form-control form-control-sm" 
                  placeholder="Promo Code (SAVE10, SAVE20)" 
                  value={inputCode} 
                  onChange={(e) => setInputCode(e.target.value)}
                  disabled={coupon.applied}
                />
                {coupon.applied ? (
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => { dispatch(removeCoupon()); setInputCode(''); }}>
                    Remove
                  </button>
                ) : (
                  <button type="submit" className="btn btn-success btn-sm">
                    Apply
                  </button>
                )}
              </form>
              {coupon.error && <p className="text-danger small mb-0 mt-1">{coupon.error}</p>}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
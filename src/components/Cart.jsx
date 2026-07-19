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
    <div className="mb-5 pt-3 border-top">
      <div className="row g-4">
        {cart.length === 0 ? (
          <div className="col-12">
            <div className="p-5 bg-white rounded shadow-sm text-center border">
              <h4 className="fw-bold mb-2">Your Cart is Empty</h4>
              <p className="text-muted mb-0">Add items from the "All Products" section above to get started.</p>
            </div>
          </div>
        ) : (
          <>
            {/* Left Column: Cart Items List */}
            <div className="col-12 col-lg-8">
              <div className="card shadow-sm border-0 rounded-4 bg-white p-4">
                <h4 className="fw-bold mb-4 text-dark fs-5">Cart ( {cart.length} items )</h4>
                
                <div className="d-flex flex-column gap-4">
                  {cart.map((item) => (
                    <div key={item.id} className="d-flex align-items-center justify-content-between flex-wrap pb-4 border-bottom gap-3">
                      
                      {/* Left: Product Image & Info */}
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
                          <div className="d-flex gap-2 mb-2">
                            <span className="text-muted" style={{ fontSize: '12px' }}>COLOR: <strong className="text-dark">{item.color || 'BLACK'}</strong></span>
                            <span className="text-muted" style={{ fontSize: '12px' }}>SIZE: <strong className="text-dark">{item.size || 'M'}</strong></span>
                          </div>
                          
                          {/* Action links under item details */}
                          <div className="d-flex gap-3 pt-1">
                            <button 
                              className="btn btn-link p-0 text-decoration-none text-muted d-flex align-items-center gap-1"
                              style={{ fontSize: '11px', fontWeight: '600' }}
                              onClick={() => dispatch(removeFromCart(item.id))}
                            >
                              🗑️ REMOVE ITEM
                            </button>
                            <button 
                              className="btn btn-link p-0 text-decoration-none text-muted d-flex align-items-center gap-1"
                              style={{ fontSize: '11px', fontWeight: '600' }}
                              onClick={() => dispatch(moveToWishlistFromCart(item))}
                            >
                              ❤️ MOVE TO WISHLIST
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Right: Quantity Controls & Price */}
                      <div className="d-flex align-items-center gap-4 ms-auto">
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

                        <div className="fw-bold fs-6 text-dark text-end" style={{ minWidth: '80px' }}>
                          Rs {item.price * item.quantity}
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Checkout Box */}
            <div className="col-12 col-lg-4">
              <div className="card shadow-sm border-0 rounded-4 bg-white p-4">
                <h4 className="fw-bold mb-4 fs-6 text-dark">The Total Amount Of</h4>
                
                <div className="d-flex justify-content-between mb-2 text-muted small">
                  <span>Temporary Amount</span>
                  <span>Rs {subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-3 text-muted small">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                
                {coupon.applied && (
                  <div className="d-flex justify-content-between mb-2 text-success fw-bold small">
                    <span>Discount ({coupon.discountPercent}% OFF)</span>
                    <span>- Rs {discountAmount.toFixed(2)}</span>
                  </div>
                )}
                
                <hr className="my-3 text-muted" />
                
                <div className="d-flex justify-content-between mb-4 fw-bold fs-6 text-dark">
                  <span>Total Amount Of (Including VAT)</span>
                  <span className="text-primary">Rs {grandTotal.toFixed(0)}</span>
                </div>
                
                <button 
                  className="btn btn-primary w-100 py-2 fw-bold mb-3 shadow-sm"
                  style={{ backgroundColor: '#0d6efd', borderRadius: '6px' }}
                >
                  GO TO CHECKOUT
                </button>

                <form onSubmit={handleApply} className="d-flex gap-2 mt-2">
                  <input 
                    type="text" 
                    className="form-control form-control-sm border" 
                    placeholder="Add a discount code (optional)" 
                    value={inputCode} 
                    onChange={(e) => setInputCode(e.target.value)}
                    disabled={coupon.applied}
                  />
                  {coupon.applied ? (
                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => { dispatch(removeCoupon()); setInputCode(''); }}>
                      Remove
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-outline-primary btn-sm fw-bold">
                      Apply
                    </button>
                  )}
                </form>
                {coupon.error && <p className="text-danger small mb-0 mt-1" style={{ fontSize: '12px' }}>{coupon.error}</p>}
                {coupon.applied && <p className="text-success small mb-0 mt-1 fw-bold" style={{ fontSize: '12px' }}>Coupon {coupon.code} applied!</p>}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeFromCart, applyCoupon, removeCoupon } from '../redux/cartSlice';

export default function Cart({ setActiveTab }) {
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

  if (cart.length === 0) {
    return (
      <div className="container text-center my-5 p-5 bg-light rounded shadow-sm">
        <h2 className="mb-3 fw-bold">Your Shopping Cart is Empty</h2>
        <p className="text-muted mb-4">You have not added any items to your cart yet.</p>
        <button className="btn btn-primary px-4 py-2 fw-bold" onClick={() => setActiveTab('products')}>
          Explore Products
        </button>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center fw-bold">Your Shopping Cart</h2>
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="row g-3">
            {cart.map((item) => (
              <div key={item.id} className="col-12">
                <div className="card custom-card shadow-sm border-0">
                  <div className="card-body d-flex align-items-center justify-content-between p-3 flex-wrap gap-3">
                    <div className="d-flex align-items-center gap-3">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '6px' }}
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/70?text=Item'; }}
                      />
                      <div>
                        <h5 className="card-title mb-1 fs-6">{item.name}</h5>
                        <p className="card-text text-muted mb-0">${item.price.toFixed(2)} each</p>
                      </div>
                    </div>
                    
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
                    
                    <div className="text-end">
                      <p className="fw-bold text-success mb-1 fs-5">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button 
                        className="btn btn-danger btn-sm" 
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="card custom-card shadow-sm border-0 bg-light">
            <div className="card-body p-4">
              <h4 className="card-title mb-3 border-bottom pb-2 fw-bold">Order Summary</h4>
              
              <form onSubmit={handleApply} className="d-flex gap-2 mb-3">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Promo Code" 
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
              
              {coupon.error && <p className="text-danger small mb-2">{coupon.error}</p>}
              {coupon.applied && <p className="text-success small mb-2 fw-bold">Coupon {coupon.code} Applied ({coupon.discountPercent}% OFF)</p>}

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {coupon.applied && (
                <div className="d-flex justify-content-between mb-2 text-success">
                  <span>Discount ({coupon.discountPercent}%):</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <hr />
              <div className="d-flex justify-content-between mb-4 fs-5 fw-bold">
                <span>Total:</span>
                <span className="text-primary">${grandTotal.toFixed(2)}</span>
              </div>
              <button className="btn btn-primary w-100 py-2 fw-bold">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
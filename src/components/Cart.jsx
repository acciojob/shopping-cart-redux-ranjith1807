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
      <div style={styles.emptyContainer}>
        <h2>Your Cart is Empty</h2>
        <p style={{ color: '#64748b', margin: '10px 0 20px 0' }}>Looks like you haven't added any items yet.</p>
        <button onClick={() => setActiveTab('products')} style={styles.shopBtn}>Start Shopping</button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={{ marginBottom: '20px', color: '#1e293b' }}>Shopping Cart</h2>
      <div style={styles.layout}>
        {/* Cart Items List */}
        <div style={styles.itemsSection}>
          {cart.map((item) => (
            <div key={item.id} style={styles.cartItem}>
              <img src={item.image} alt={item.name} style={styles.image} />
              <div style={styles.itemInfo}>
                <h4 style={{ margin: 0, fontSize: '18px' }}>{item.name}</h4>
                <p style={{ margin: '4px 0', color: '#64748b' }}>${item.price.toFixed(2)}</p>
              </div>
              <div style={styles.controls}>
                <button onClick={() => dispatch(decreaseQuantity(item.id))} style={styles.qtyBtn}>-</button>
                <span style={styles.qtyText}>{item.quantity}</span>
                <button onClick={() => dispatch(increaseQuantity(item.id))} style={styles.qtyBtn}>+</button>
              </div>
              <div style={styles.itemTotal}>
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button onClick={() => dispatch(removeFromCart(item.id))} style={styles.removeBtn}>✕</button>
            </div>
          ))}
        </div>

        {/* Order Summary & Coupons */}
        <div style={styles.summarySection}>
          <h3 style={{ marginTop: 0, borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>Order Summary</h3>
          
          <form onSubmit={handleApply} style={styles.couponForm}>
            <input 
              type="text" 
              placeholder="Promo Code (SAVE10, SAVE20)" 
              value={inputCode} 
              onChange={(e) => setInputCode(e.target.value)}
              disabled={coupon.applied}
              style={styles.input}
            />
            {coupon.applied ? (
              <button type="button" onClick={() => { dispatch(removeCoupon()); setInputCode(''); }} style={styles.removeCouponBtn}>Remove</button>
            ) : (
              <button type="submit" style={styles.applyBtn}>Apply</button>
            )}
          </form>
          {coupon.error && <p style={styles.errorText}>{coupon.error}</p>}
          {coupon.applied && <p style={styles.successText}>Coupon {coupon.code} applied! ({coupon.discountPercent}% OFF)</p>}

          <div style={styles.row}>
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {coupon.applied && (
            <div style={{ ...styles.row, color: '#10b981' }}>
              <span>Discount ({coupon.discountPercent}%):</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div style={styles.totalRow}>
            <span>Total:</span>
            <span style={{ color: '#0284c7' }}>${grandTotal.toFixed(2)}</span>
          </div>
          <button style={styles.checkoutBtn}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '30px 40px', maxWidth: '1200px', margin: '0 auto' },
  emptyContainer: { textAlign: 'center', padding: '80px 20px' },
  shopBtn: { padding: '10px 20px', backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px' },
  layout: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px', alignItems: 'start' },
  itemsSection: { display: 'flex', flexDirection: 'column', gap: '15px' },
  cartItem: { display: 'flex', alignItems: 'center', padding: '15px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', gap: '15px' },
  image: { width: '70px', height: '70px', objectFit: 'cover', borderRadius: '6px' },
  itemInfo: { flex: 1 },
  controls: { display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#f1f5f9', padding: '4px 8px', borderRadius: '6px' },
  qtyBtn: { background: '#fff', border: '1px solid #cbd5e1', width: '28px', height: '28px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  qtyText: { fontWeight: 'bold', minWidth: '20px', textAlign: 'center' },
  itemTotal: { fontWeight: 'bold', fontSize: '16px', minWidth: '80px', textAlign: 'right' },
  removeBtn: { background: 'transparent', border: 'none', color: '#ef4444', fontSize: '18px', cursor: 'pointer', padding: '5px' },
  summarySection: { padding: '20px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' },
  couponForm: { display: 'flex', gap: '8px', margin: '15px 0 5px 0' },
  input: { flex: 1, padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', outline: 'none' },
  applyBtn: { padding: '8px 16px', backgroundColor: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  removeCouponBtn: { padding: '8px 12px', backgroundColor: '#64748b', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  errorText: { color: '#ef4444', fontSize: '12px', margin: '4px 0 10px 0' },
  successText: { color: '#10b981', fontSize: '12px', margin: '4px 0 10px 0', fontWeight: 'bold' },
  row: { display: 'flex', justifyContent: 'space-between', margin: '12px 0', color: '#475569' },
  totalRow: { display: 'flex', justifyContent: 'space-between', margin: '15px 0', paddingTop: '15px', borderTop: '1px solid #e2e8f0', fontSize: '20px', fontWeight: 'bold', color: '#0f172a' },
  checkoutBtn: { width: '100%', padding: '12px', backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }
};
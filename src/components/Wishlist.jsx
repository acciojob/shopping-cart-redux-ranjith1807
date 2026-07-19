import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist, addToCart } from '../redux/cartSlice';

export default function Wishlist({ setActiveTab }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.shop.wishlist);

  if (wishlist.length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <h2>Your Wishlist is Empty</h2>
        <p style={{ color: '#64748b', margin: '10px 0 20px 0' }}>Save items you like to view or buy them later.</p>
        <button onClick={() => setActiveTab('products')} style={styles.shopBtn}>Explore Products</button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={{ marginBottom: '20px', color: '#1e293b' }}>My Wishlist ({wishlist.length})</h2>
      <div style={styles.grid}>
        {wishlist.map((item) => (
          <div key={item.id} style={styles.card}>
            <img src={item.image} alt={item.name} style={styles.image} />
            <div style={styles.details}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>{item.name}</h4>
              <p style={{ margin: '0 0 15px 0', fontWeight: 'bold', color: '#10b981' }}>${item.price.toFixed(2)}</p>
              <div style={styles.actions}>
                <button 
                  onClick={() => {
                    dispatch(addToCart(item));
                    dispatch(toggleWishlist(item));
                  }} 
                  style={styles.moveBtn}
                >
                  Move to Cart
                </button>
                <button 
                  onClick={() => dispatch(toggleWishlist(item))} 
                  style={styles.removeBtn}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '30px 40px', maxWidth: '1200px', margin: '0 auto' },
  emptyContainer: { textAlign: 'center', padding: '80px 20px' },
  shopBtn: { padding: '10px 20px', backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' },
  card: { border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#fff', display: 'flex', flexDirection: 'column' },
  image: { width: '100%', height: '160px', objectFit: 'cover' },
  details: { padding: '15px', display: 'flex', flexDirection: 'column', flex: 1 },
  actions: { display: 'flex', gap: '8px', marginTop: 'auto' },
  moveBtn: { flex: 1, padding: '8px', backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' },
  removeBtn: { padding: '8px 12px', backgroundColor: '#f1f5f9', color: '#ef4444', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }
};
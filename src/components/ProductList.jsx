import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, toggleWishlist } from '../redux/cartSlice';

export default function ProductList() {
  const dispatch = useDispatch();
  const { products, wishlist } = useSelector((state) => state.shop);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Featured Products</h2>
      <div style={styles.grid}>
        {products.map((product) => {
          const isWishlisted = wishlist.some((item) => item.id === product.id);
          return (
            <div key={product.id} style={styles.card}>
              <div style={styles.imageContainer}>
                <img src={product.image} alt={product.name} style={styles.image} />
                <button 
                  onClick={() => dispatch(toggleWishlist(product))}
                  style={{ ...styles.wishlistBtn, color: isWishlisted ? '#ef4444' : '#94a3b8' }}
                  title="Toggle Wishlist"
                >
                  ♥
                </button>
              </div>
              <div style={styles.details}>
                <span style={styles.category}>{product.category}</span>
                <h3 style={styles.name}>{product.name}</h3>
                <p style={styles.price}>${product.price.toFixed(2)}</p>
                <button 
                  onClick={() => dispatch(addToCart(product))} 
                  style={styles.addBtn}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '30px 40px', maxWidth: '1200px', margin: '0 auto' },
  title: { marginBottom: '20px', color: '#1e293b' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '25px' },
  card: { border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', backgroundColor: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' },
  imageContainer: { position: 'relative', height: '200px', backgroundColor: '#f8fafc' },
  image: { width: '100%', height: '100%', objectFit: 'cover' },
  wishlistBtn: { position: 'absolute', top: '10px', right: '10px', background: '#fff', border: 'none', borderRadius: '50%', width: '36px', height: '36px', fontSize: '20px', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  details: { padding: '15px', display: 'flex', flexDirection: 'column', flex: 1 },
  category: { fontSize: '12px', color: '#64748b', textTransform: 'uppercase', fontWeight: 'bold' },
  name: { margin: '5px 0 10px 0', fontSize: '18px', color: '#0f172a' },
  price: { fontSize: '20px', fontWeight: 'bold', color: '#10b981', marginBottom: '15px' },
  addBtn: { marginTop: 'auto', padding: '10px', backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' }
};
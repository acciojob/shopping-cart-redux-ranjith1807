import React from 'react';
import { useSelector } from 'react-redux';

export default function Navbar({ activeTab, setActiveTab }) {
  const { cart, wishlist } = useSelector((state) => state.shop);
  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo} onClick={() => setActiveTab('products')}>
        🛍️ Redux Store
      </div>
      <div style={styles.navLinks}>
        <button 
          style={activeTab === 'products' ? styles.activeBtn : styles.btn}
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
        <button 
          style={activeTab === 'wishlist' ? styles.activeBtn : styles.btn}
          onClick={() => setActiveTab('wishlist')}
        >
          Wishlist <span style={styles.badge}>{wishlist.length}</span>
        </button>
        <button 
          style={activeTab === 'cart' ? styles.activeBtn : styles.btn}
          onClick={() => setActiveTab('cart')}
        >
          Cart <span style={styles.badge}>{totalCartItems}</span>
        </button>
      </div>
    </nav>
  );
}

const styles = {
  navbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 40px', backgroundColor: '#1e293b', color: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
  logo: { fontSize: '22px', fontWeight: 'bold', cursor: 'pointer' },
  navLinks: { display: 'flex', gap: '15px' },
  btn: { padding: '8px 16px', background: 'transparent', border: '1px solid #475569', color: '#fff', borderRadius: '6px', cursor: 'pointer', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px' },
  activeBtn: { padding: '8px 16px', background: '#3b82f6', border: '1px solid #3b82f6', color: '#fff', borderRadius: '6px', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' },
  badge: { backgroundColor: '#ef4444', color: '#fff', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }
};
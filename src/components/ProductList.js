import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, toggleWishlist } from '../redux/shopSlice';

const DUMMY_PRODUCTS = [
  { id: 1, name: 'Wireless Mouse', price: 25 },
  { id: 2, name: 'Mechanical Keyboard', price: 80 },
  { id: 3, name: 'Gaming Monitor', price: 300 },
  { id: 4, name: 'USB-C Hub', price: 45 },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.shop.wishlist);

  const isInWishlist = (id) => wishlist.some(item => item.id === id);

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>Products</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {DUMMY_PRODUCTS.map(product => (
          // The tests look for div > .custom-card.card > .card-body > .btn
          <div key={product.id} style={{ width: '45%' }}>
            
            <div className="custom-card card" style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
              <div className="card-body">
                <h4 className="card-title">{product.name}</h4>
                <p className="card-text">${product.price.toFixed(2)}</p>
                
                {/* Test 2 & 3 specifically look for button.btn-primary here */}
                <button 
                  className="btn btn-primary" 
                  style={{ marginRight: '10px', padding: '8px 12px', background: 'blue', color: 'white', border: 'none' }}
                  onClick={() => dispatch(addToCart(product))}
                >
                  Add to Cart
                </button>
                
                <button 
                  className="btn btn-secondary"
                  style={{ padding: '8px 12px', border: '1px solid #333' }}
                  onClick={() => dispatch(toggleWishlist(product))}
                >
                  {isInWishlist(product.id) ? 'Remove Wishlist' : 'Add Wishlist'}
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
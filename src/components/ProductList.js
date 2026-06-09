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
    <div className="products-container" style={{ flex: 2 }}>
      {/* Cypress Test #1 demands this is exactly an <h3> */}
      <h3>Products</h3>
      
      {/* Products MUST be direct siblings of the h3 for nth-child tests to pass */}
      {DUMMY_PRODUCTS.map(product => (
        <div key={product.id} style={{ marginBottom: '15px' }}>
          
          {/* Cypress Test #2, #3, #4 look for this exact card structure */}
          <div className="custom-card card" style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
            <div className="card-body">
              <h4 className="card-title">{product.name}</h4>
              <p className="card-text">${product.price.toFixed(2)}</p>
              
              <button 
                className="btn btn-primary" 
                style={{ marginRight: '10px' }}
                onClick={() => dispatch(addToCart(product))}
              >
                Add to Cart
              </button>
              
              <button 
                className="btn btn-secondary"
                onClick={() => dispatch(toggleWishlist(product))}
              >
                {isInWishlist(product.id) ? 'Remove Wishlist' : 'Add Wishlist'}
              </button>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
};

export default ProductList;
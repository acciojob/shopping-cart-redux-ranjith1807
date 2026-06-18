import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, toggleWishlist } from '../redux/cartSlice';

const DUMMY_PRODUCTS = [
  { id: 1, name: 'Wireless Headphones', price: 120, image: '🎧' },
  { id: 2, name: 'Mechanical Keyboard', price: 85, image: '⌨️' },
  { id: 3, name: 'Gaming Mouse', price: 50, image: '🖱️' },
  { id: 4, name: '4K Monitor', price: 300, image: '🖥️' },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.cart.wishlistItems);

  const isWishlisted = (id) => wishlistItems.some(item => item.id === id);

  return (
    <div className="row">
      {DUMMY_PRODUCTS.map((product) => (
        <div key={product.id} className="col-md-6 mb-4">
          <div className="card custom-card">
            <div className="card-body text-center">
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>{product.image}</div>
              
              {/* Cypress explicitly checks for h4 inside .custom-card */}
              <h4>{product.name}</h4>
              <p>${product.price}</p>
              
              {/* Cypress explicitly checks for .btn as a DIRECT child of .card-body */}
              <button 
                className="btn btn-primary" 
                onClick={() => dispatch(addToCart(product))}
              >
                Add to Cart
              </button>
              
              <button 
                className={`btn ${isWishlisted(product.id) ? 'btn-danger' : 'btn-outline-danger'} ms-2`}
                onClick={() => dispatch(toggleWishlist(product))}
              >
                {isWishlisted(product.id) ? '❤️' : '🤍'}
              </button>
              
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
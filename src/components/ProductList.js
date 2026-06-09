import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/shopSlice';

// Updated data to perfectly match your screenshot
const DUMMY_PRODUCTS = [
  { 
    id: 1, 
    name: 'Blue Denim Shirt', 
    category: 'SHIRT - BLUE',
    price: 1799,
    image: 'https://via.placeholder.com/200x200.png?text=Denim+Shirt' // Replace with your actual image paths
  },
  { 
    id: 2, 
    name: 'Red Hoodie', 
    category: 'HOODIE - RED',
    price: 3599,
    image: 'https://via.placeholder.com/200x200.png?text=Red+Hoodie'
  },
  { 
    id: 3, 
    name: 'Navy T-Shirt', 
    category: 'T-SHIRT - NAVY',
    price: 1599,
    image: 'https://via.placeholder.com/200x200.png?text=Navy+T-Shirt'
  },
  { 
    id: 4, 
    name: 'Black Chino Pants', 
    category: 'CHINO PANTS - BLACK',
    price: 6599,
    image: 'https://via.placeholder.com/200x200.png?text=Chino+Pants'
  },
];

const ProductList = () => {
  const dispatch = useDispatch();

  return (
    <div className="products-container" style={{ flex: 2 }}>
      <h3>All Products</h3>
      <p className="text-muted">All Products that available to order</p>
      
      <div className="product-grid">
        {DUMMY_PRODUCTS.map(product => (
          <div key={product.id} className="custom-card card">
            
            {/* Product Image */}
            <img src={product.image} alt={product.name} className="card-img-top" />
            
            <div className="card-body">
              <h4 className="card-title">{product.name}</h4>
              <p className="product-category">{product.category}</p>
              <p className="card-text">Rs {product.price}</p>
              
              {/* Cypress targets this button */}
              <button 
                className="btn btn-primary add-to-cart-btn" 
                onClick={() => dispatch(addToCart(product))}
              >
                Add To Cart
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
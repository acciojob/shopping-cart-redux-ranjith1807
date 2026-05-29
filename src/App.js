import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './features/cartSlice';
import { toggleWishlist } from './features/wishlistSlice';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';

const PRODUCTS = [
  { id: 1, name: 'Laptop', price: 999 },
  { id: 2, name: 'Smartphone', price: 599 },
  { id: 3, name: 'Headphones', price: 199 },
  { id: 4, name: 'Keyboard', price: 99 },
  { id: 5, name: 'Mouse', price: 49 },
];

const App = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const isInWishlist = (id) => wishlistItems.some((item) => item.id === id);

  return (
    <>
      {/* Child 1 of #root */}
      <nav className="navbar-expand-lg" style={{ backgroundColor: '#f8f9fa', padding: '15px', marginBottom: '20px' }}>
        <h1 className="text-center" style={{ margin: 0, textAlign: 'center' }}>Redux Shopping Cart</h1>
      </nav>
      
      {/* Child 2 of #root (This is the container Cypress is targeting) */}
      <div className="main-container" style={{ display: 'flex', gap: '30px', padding: '0 20px', flexWrap: 'wrap' }}>
        
        {/* Child 1 of main-container */}
        <div className="products-list" style={{ flex: '2', minWidth: '300px' }}>
          
          {/* :nth-child(1) -> The h3 Cypress is expecting */}
          <h3>Products</h3>
          
          {/* :nth-child(2), :nth-child(3), etc. -> The product cards */}
          {PRODUCTS.map((product) => (
            <div key={product.id} className="product-wrapper">
              
              {/* .custom-card .card */}
              <div className="custom-card card" style={{ border: '1px solid #ddd', marginBottom: '15px', borderRadius: '8px' }}>
                
                {/* .card-body */}
                <div className="card-body" style={{ padding: '15px' }}>
                  
                  {/* Cypress Error: Expected .custom-card h4 */}
                  <h4>{product.name}</h4>
                  <p>${product.price}</p>
                  
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {/* .btn */}
                    <button 
                      className="btn btn-primary" 
                      onClick={() => dispatch(addToCart(product))}
                    >
                      Add to Cart
                    </button>
                    
                    <button 
                      className="btn btn-secondary" 
                      onClick={() => dispatch(toggleWishlist(product))}
                    >
                      {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Sidebar for Cart and Wishlist */}
        <div className="sidebar-container" style={{ flex: '1', minWidth: '300px' }}>
          <Cart />
          <Wishlist />
        </div>

      </div>
    </>
  );
};

export default App;
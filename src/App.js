import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './features/cartSlice';
import { toggleWishlist } from './features/wishlistSlice';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';

// Added more products because the tests click up to the 4th child!
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
    <div className="App">
      {/* Cypress Error 1: Expected to find element: `.navbar-expand-lg > .text-center` */}
      <nav className="navbar-expand-lg" style={{ backgroundColor: '#f8f9fa', padding: '15px', marginBottom: '20px' }}>
        <h1 className="text-center" style={{ textAlign: 'center', margin: 0 }}>Redux Shopping Cart</h1>
      </nav>
      
      <div style={{ display: 'flex', gap: '30px', padding: '0 20px', flexWrap: 'wrap' }}>
        
        {/* Products List Container */}
        <div style={{ flex: '2' }}>
          <h2>Products</h2>
          <div className="products-grid">
            {PRODUCTS.map((product) => (
              /* Cypress Errors 4, 5, 6, 7: Expected to find `:nth-child(x) > .custom-card > .card-body > .btn` */
              <div key={product.id} style={{ marginBottom: '15px' }}>
                
                {/* Cypress Error 2 & 3: Expected `.custom-card.card` */}
                <div className="custom-card card" style={{ border: '1px solid #ddd', borderRadius: '8px' }}>
                  
                  {/* Must have a .card-body inside */}
                  <div className="card-body" style={{ padding: '15px' }}>
                    <h3 className="card-title">{product.name}</h3>
                    <p className="card-text">${product.price}</p>
                    
                    <div style={{ display: 'flex', gap: '10px' }}>
                      {/* Cypress Error 2 & 3: Expected `button.btn-primary` */}
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
        </div>

        {/* Cart & Wishlist Container */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <Cart />
          <Wishlist />
        </div>

      </div>
    </div>
  );
};

export default App;
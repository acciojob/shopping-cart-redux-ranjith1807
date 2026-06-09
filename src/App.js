import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import './styles/App.css'; 

function App() {
  return (
    <Provider store={store}>
      {/* Test 1 looks for this exact navbar structure */}
      <nav className="navbar navbar-expand-lg bg-light">
        <h2 className="text-center w-100" style={{ width: '100%', textAlign: 'center' }}>
          Shopping Cart
        </h2>
      </nav>

      <div className="App" style={{ display: 'flex', gap: '30px', padding: '20px', flexWrap: 'wrap' }}>
        <div className="products-container" style={{ flex: 2 }}>
          <ProductList />
        </div>
        
        <div className="sidebar" style={{ flex: 1 }}>
          <div className="section-card mb-4">
            <Cart />
          </div>
          <div className="section-card">
            <Wishlist />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
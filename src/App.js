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
      <div className="App">
        {/* LEFT COLUMN: Products */}
        <div className="products-container">
          <ProductList />
        </div>
        
        {/* RIGHT COLUMN: Cart & Wishlist */}
        <div className="sidebar">
          <div className="section-card">
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
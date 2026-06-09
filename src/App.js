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
      {/* 1st Child of #root: The Navbar */}
      <nav className="navbar navbar-expand-lg bg-light">
        <h2 className="text-center w-100" style={{ width: '100%', textAlign: 'center' }}>
          Shopping Cart
        </h2>
      </nav>

      {/* 2nd Child of #root: The Main Container */}
      <div className="App" style={{ display: 'flex', gap: '20px', padding: '20px' }}>
        
        {/* 1st Child of Main Container: The Products List */}
        <ProductList />
        
        {/* 2nd Child of Main Container: The Sidebar (Cart/Wishlist) */}
        <div className="sidebar" style={{ flex: 1 }}>
          <Cart />
          <Wishlist />
        </div>
        
      </div>
    </Provider>
  );
}

export default App;
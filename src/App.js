import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ProductList from './components/ProductList';
import Wishlist from './components/Wishlist';
import Cart from './components/Cart';
import './styles/App.css'; 

function App() {
  return (
    <Provider store={store}>
      <nav className="navbar navbar-expand-lg bg-light" style={{ padding: '15px 0', background: 'white', marginBottom: '20px' }}>
        <h2 className="text-center w-100" style={{ textAlign: 'center', margin: 0, color: '#555', fontSize: '1.2rem' }}>
          Shopping Cart
        </h2>
      </nav>

      <div className="App">
        <ProductList />
        <Wishlist />
        <Cart />
      </div>
    </Provider>
  );
}

export default App;
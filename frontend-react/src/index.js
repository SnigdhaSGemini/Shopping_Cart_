import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from  'react-router-dom';
import { AuthProvider } from './Contexts/Authorization';
import { SearchProvider } from './Contexts/Search';
import 'antd/dist/reset.css';
import { CartProvider } from './Contexts/Cart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Context providers
  <AuthProvider>
 <SearchProvider>
<CartProvider>
<BrowserRouter>
  <App />
</BrowserRouter>
</CartProvider>
 </SearchProvider>
  </AuthProvider>
);


reportWebVitals();

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import store from './redux/store.js';

fetch('shopcart-g6b6exbrddb2h4hw.canadacentral-01.azurewebsites.net')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Error:", error));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)

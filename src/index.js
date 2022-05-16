//Gets framework from react and files from project
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

//gets root from html file
const root = ReactDOM.createRoot(document.getElementById('root'));

//renders App in html file
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
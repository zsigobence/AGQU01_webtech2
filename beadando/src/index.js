import React from 'react';
import './index.css';
import Login from './App';
import reportWebVitals from './reportWebVitals';
import {createRoot} from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Router>
    <Login />
  </Router>
);


reportWebVitals();

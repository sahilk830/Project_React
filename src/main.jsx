

import React from 'react';

import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'; 

import Login from './components/Login'; 
import Manager from './components/Manager'; 

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login />} />  

        <Route path="/manager" element={<Manager />} /> 

      </Routes>
    </Router>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <React.StrictMode>
    <App />

  </React.StrictMode>
);

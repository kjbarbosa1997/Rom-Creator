import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header'
import CustomerForm from './pages/CustomerForm'
import AdminForm from './pages/AdminForm'
import ROMTable from './pages/ROMTable'
import Home from './pages/Home'
import Button from '@mui/material/Button'
import { Paper } from '@mui/material'


function App() {
  

  return (
    <div className="wrapper">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/customer" element={<CustomerForm />} />
          <Route exact path="/admin" element={<AdminForm />} />
          <Route exact path="/romtable" element={<ROMTable />} />
          <Route exact path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>

    
    </div>
  );
}

// Add this in your component file
require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);

export default App;

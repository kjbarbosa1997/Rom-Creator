import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header'
import CustomerForm from './pages/CustomerForm'
import AdminForm from './pages/AdminForm'
import ROMTable from './pages/ROMTable'
import Home from './pages/Home'


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

export default App;

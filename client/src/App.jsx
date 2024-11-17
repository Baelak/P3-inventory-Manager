// File: client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Inventory from './pages/Inventory';
import InventoryItemCard from './components/InventoryItemCard';

const App = () => {
  return (
    <Router> {/* This will now work correctly as BrowserRouter */}
      <Header />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/inventoryitemcard" element={<InventoryItemCard />} />
      </Routes>
      <h1>Logo and message here</h1>
      <Footer />
    </Router>
  );
};

export default App;

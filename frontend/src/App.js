import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import VehicleRegulationCheck from './components/VehicleRegulationCheck/VehicleRegulationCheck';
import Tiles from './components/Tiles/Tiles';
import BookSlot from './components/BookSlot/BookSlot';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import TrafficMonitoring from './components/TrafficMonitoring/TrafficMonitoring';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from './components/PrivateRoute';  // Ensure this import path is correct

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/parking-management" element={<PrivateRoute element={Tiles} />} />
        <Route path="/vehicle-regulation" element={<PrivateRoute element={VehicleRegulationCheck} />} />
        <Route path="/available" element={<PrivateRoute element={BookSlot} />} />
        <Route path="/traffic" element={<PrivateRoute element={TrafficMonitoring} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


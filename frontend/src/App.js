import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import VehicleRegulationCheck from './components/VehicleRegulationCheck/VehicleRegulationCheck';
import Tiles from './components/Tiles/Tiles';
import BookSlot from './components/BookSlot/BookSlot';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';

import 'bootstrap/dist/css/bootstrap.min.css';
import TrafficMonitoring from './components/TrafficMonitoring/TrafficMonitoring';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/parking-management" element={<Tiles />} />
        <Route path="/vehicle-regulation" element={<VehicleRegulationCheck />} />
        <Route path="/available" element={<BookSlot />} />
        <Route path="/traffic" element={<TrafficMonitoring/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

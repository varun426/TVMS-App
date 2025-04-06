import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import VehicleRegulationCheck from './components/VehicleRegulationCheck/VehicleRegulationCheck';
import Tiles from './components/Tiles/Tiles';

import 'bootstrap/dist/css/bootstrap.min.css';
import BookSlot from './components/BookSlot/BookSlot';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/parking-management" element={<Tiles />}></Route>
        <Route path="/vehicle-regulation" element={<VehicleRegulationCheck />} />
        <Route path="/available" element={<BookSlot />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

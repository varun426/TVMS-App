import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Tiles from './components/Tiles';
import VehicleRegulationCheck from './components/VehicleRegulationCheck';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Tiles/>}></Route>
        {/* <Route path="/vehicle-regulate" element={<Tiles/>}></Route> */}
        <Route path="/vehicle-regulate" element={<VehicleRegulationCheck />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

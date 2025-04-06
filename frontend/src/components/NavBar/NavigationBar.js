import React from "react";
import { Link } from "react-router-dom";
import "./navigationBar.css";
import logolight from "../../Assets/logo.png";

const NavigationBar = () => {
  return (
    <div className="navbar">
      <img src={logolight} alt="" className="logo"></img>
      <ul>
        <li>
          <a href="http://localhost:3000/"></a>Dashboard
        </li>
        <li>Parking Management</li>
        <li>Vehicle Regulation</li>
        <li>Traffic Monitoring</li>
      </ul>
    </div>
  );
};

export default NavigationBar;

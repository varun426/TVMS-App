import React from "react";
import {NavLink} from "react-router-dom";
import "./navigationBar.css";

const NavigationBar = () => {
  return (
    <div className="navbar">
      <img src="/assets/logo.png" alt="TVMS Logo" className="logo" />
      <ul className="navItems">
        <li>
          <NavLink to="https://www.youtube.com/watch?v=m55PTVUrlnA" className={({ isActive }) => isActive ? "active-link" : ""}>Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/parking" className={({ isActive }) => isActive ? "active-link" : ""}>Parking Management</NavLink>
        </li>
        <li>
          <NavLink to="/vehicle" className={({ isActive }) => isActive ? "active-link" : ""}>Vehicle Regulation</NavLink>
        </li>
        <li>
          <NavLink to="/traffic" className={({ isActive }) => isActive ? "active-link" : ""}>Traffic Monitoring</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavigationBar;

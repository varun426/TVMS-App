import React from "react";
import {NavLink} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./navigationBar.css";

const NavigationBar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <img src="/assets/log_v1-removebg-preview.png" alt="TVMS Logo" className="logo" />
      <ul className="navItems">
        <li>
          <NavLink to="https://www.youtube.com/watch?v=m55PTVUrlnA" className={({ isActive }) => isActive ? "active-link" : ""}>Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/parking-management" className={({ isActive }) => isActive ? "active-link" : ""}>Parking Management</NavLink>
        </li>
        <li>
          <NavLink to="/vehicle-regulate" className={({ isActive }) => isActive ? "active-link" : ""}>Vehicle Regulation</NavLink>
        </li>
        <li>
          <NavLink to="/traffic" className={({ isActive }) => isActive ? "active-link" : ""}>Traffic Monitoring</NavLink>
        </li>
        
      </ul>
    </div>
  );
};

export default NavigationBar;

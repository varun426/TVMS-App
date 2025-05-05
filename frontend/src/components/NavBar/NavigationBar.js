import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getUsernameFromToken } from "./utils/jwtUtils.js"
import "./navigationBar.css";

const NavigationBar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    setUsername(getUsernameFromToken());
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="navbar">
      <img src="/assets/log_v1-removebg-preview.png" alt="TVMS Logo" className="logo" />
      <ul className="navItems">
        <li><NavLink to="/parking-management" className={({ isActive }) => isActive ? "active-link" : ""}>Parking Management</NavLink></li>
        <li><NavLink to="/vehicle-regulation" className={({ isActive }) => isActive ? "active-link" : ""}>Vehicle Regulation</NavLink></li>
        <li><NavLink to="/traffic" className={({ isActive }) => isActive ? "active-link" : ""}>Traffic Monitoring</NavLink></li>
        <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? "active-link" : ""}>Dashboard</NavLink></li>
      </ul>

      <div className="profile-dropdown" ref={dropdownRef}>
        <img
          src="/assets/profile-icon.png"
          alt="Profile"
          className="profile-icon"
          onClick={toggleDropdown}
        />
        <div className={`dropdown-menu ${dropdownOpen ? "active" : ""}`}>
          <p className="username">👤 {username || "User"}</p>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;

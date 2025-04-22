import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Auth.css';

const Register = () => {
  const [user, setUser] = useState({ username: "", password: "", role: "COMMUTER" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/auth/register", user);
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <select name="role" value={user.role} onChange={handleChange} required>
          <option value="COMMUTER">Commuter</option>
          <option value="TRAFFIC_REGULATOR">Traffic Regulator</option>
          <option value="PARKING_ADMINISTRATOR">Parking Administrator</option>
        </select>
        <button type="submit">Register</button>
      </form>
      <p>Already registered? <a href="/login">Login</a></p>
    </div>
  );
};

export default Register;

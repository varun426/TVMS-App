import React, { useState } from "react";
import './VehicleRegulationCheck.css'; // Create and style this as needed

const VehicleRegulationCheck = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [rule, setRule] = useState("");

  const checkRule = () => {
    const lastDigit = vehicleNumber.trim().slice(-1);
    if (!/^\d$/.test(lastDigit)) {
      setRule("Please enter a valid vehicle number ending with a digit.");
      return;
    }
    const isEven = parseInt(lastDigit, 10) % 2 === 0;
    setRule(
      isEven
        ? "Even-numbered vehicles are allowed to drive today."
        : "Odd-numbered vehicles are allowed to drive today."
    );
  };

  return (
    <div className="regulation-container">
      <h2>Vehicle Regulation Check</h2>
      <p>Enter your vehicle number to check if you are allowed to drive today based on the odd/even rule.</p>

      <div className="input-group">
        <input
          type="text"
          placeholder="Enter Vehicle Number"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
          className="form-control"
        />
        <button className="btn btn-danger" onClick={checkRule}>Check</button>
      </div>

      {rule && (
        <div className="rule-box">
          <strong>Today's Rule</strong>
          <p>{rule}</p>
        </div>
      )}
    </div>
  );
};

export default VehicleRegulationCheck;

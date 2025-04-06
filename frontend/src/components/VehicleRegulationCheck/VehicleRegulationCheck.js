import React, { useState } from "react";
import "./VehicleRegulationCheck.css";
import axios from "axios";

const VehicleRegulationCheck = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [ruleInfo, setRuleInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleCheck = async () => {
    try {
      const response = await axios.get("/vehicle-regulation/vehicleinformation", {
        params: { vehicleNumber }
      });
      setRuleInfo(response.data);
      setError(null);
    } catch (err) {
      setError("This vehicle is not registered");
      setRuleInfo(null);
    }
  };

  return (
    <div className="check-container">
      <h2>Vehicle Regulation Check</h2>
      <p>Enter your vehicle number to check if you are allowed to drive today based on the odd/even rule.</p>
      
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter Vehicle Number"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
        />
        <button className="btn btn-danger" onClick={handleCheck}>Check</button>
      </div>

      {ruleInfo && (
        <div className="result-box">
          <h4><strong>Result:</strong></h4>
          <pre>{JSON.stringify(ruleInfo, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div className="error-text">{error}</div>
      )}
    </div>
  );
};

export default VehicleRegulationCheck;

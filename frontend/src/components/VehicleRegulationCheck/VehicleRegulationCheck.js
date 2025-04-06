import React, { useState } from "react";
import "./VehicleRegulationCheck.css";
import axios from "axios";
import NavigationBar from './../NavBar/NavigationBar';

const VehicleRegulationCheck = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [ruleInfo, setRuleInfo] = useState(null);
  const [error, setError] = useState(null);
  const [isAllowedToday, setIsAllowedToday] = useState(null);
  const [todayRule, setTodayRule] = useState("");
  const [penalties, setPenalties] = useState([]);


  const getTodayRule = () => {
    const day = new Date().getDay(); 
    const evenDays = [0, 2, 4, 6]; 

    if (evenDays.includes(day)) return "even";
    return "odd";
  };

  const isVehicleAllowed = (vehicleNumber) => {
    const lastDigit = parseInt(vehicleNumber.slice(-1));
    if (isNaN(lastDigit)) return false;

    const todayRule = getTodayRule();
    setTodayRule(todayRule);

    const isEven = lastDigit % 2 === 0;
    return todayRule === "even" ? isEven : !isEven;
  };

  const handleCheck = async () => {
    try {
      const response = await axios.get("/vehicle-regulation/vehicleinformation", {
        params: { vehicleNumber }
      });
      // const response = [
      //   {
      //     id: 4,
      //     vehicleNumber: "TS05CD7890",
      //     penaltyAmount: 700,
      //     violationType: "No Helmet",
      //     violationTime: "2025-04-01T17:35:30",
      //     fastTagAmount: 250
      //   },
      //   {
      //     id: 6,
      //     vehicleNumber: "TS05CD7890",
      //     penaltyAmount: 700,
      //     violationType: "Even/Odd violation",
      //     violationTime: "2025-04-01T17:35:30",
      //     fastTagAmount: 250
      //   }
      // ];
      setRuleInfo(response.data[0]);
      const allowed = isVehicleAllowed(response.data[0].vehicleNumber);
      setIsAllowedToday(allowed);
      setPenalties(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch vehicle information.");
      setRuleInfo(null);
      setIsAllowedToday(null);
      setIsAllowedToday(null);
    }
  };

  return (
    <>
      <NavigationBar />
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

        {todayRule && (
          <div className="rule-box">
            <h4>Today's Rule:</h4>{" "}
            <p>{todayRule === "even"
              ? "Even-numbered vehicles are allowed to drive today."
              : "Odd-numbered vehicles are allowed to drive today."}</p>
          </div>
        )}

        {isAllowedToday !== null && (
          <div className={`permission-box ${isAllowedToday ? 'allowed' : 'not-allowed'}`}>
            <strong>
              You are <span style={{ textTransform: 'uppercase' }}>{isAllowedToday ? 'Allowed' : 'Not Allowed'}</span> to drive today
            </strong>
          </div>
        )}

        {penalties.length > 0 && (
          <div className="penalties-section">
            <table className="penalty-table">
              <thead>
                <tr>
                  <th>Violation Type</th>
                  <th>Amount</th>
                  <th>Violation Time</th>
                </tr>
              </thead>
              <tbody>
                {penalties.map((penalty) => (
                  <tr key={penalty.id}>
                    <td>{penalty.violationType}</td>
                    <td>₹{penalty.penaltyAmount}</td>
                    <td>{new Date(penalty.violationTime).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="fasttag-balance">FastTag Balance: ₹{penalties[penalties.length - 1].fastTagAmount}</p>
          </div>
        )}
  

        {error && (
          <div className="error-text">{error}</div>
        )}
      </div>
    </>
  );
};

export default VehicleRegulationCheck;

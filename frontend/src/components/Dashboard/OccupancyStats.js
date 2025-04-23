// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { PieChart, Pie, Cell, Tooltip } from "recharts";

// // const COLORS = ["#e74c3c", "#2ecc71"]; // Red for occupied, Green for free

// // const OccupancyCard = ({ location, percent }) => {
// //   const data = [
// //     { name: "Occupied", value: percent },
// //     { name: "Free", value: 100 - percent }
// //   ];

// //   return (
// //     <div className="bg-white shadow-md rounded-2xl p-4 m-2 w-64">
// //       <h3 className="text-lg font-semibold text-center">{location}</h3>
// //       <PieChart width={160} height={160}>
// //         <Pie
// //           data={data}
// //           cx="50%"
// //           cy="50%"
// //           innerRadius={40}
// //           outerRadius={60}
// //           paddingAngle={5}
// //           dataKey="value"
// //         >
// //           {data.map((_, index) => (
// //             <Cell key={`cell-${index}`} fill={COLORS[index]} />
// //           ))}
// //         </Pie>
// //         <Tooltip />
// //       </PieChart>
// //       <p className="text-center mt-2">{percent.toFixed(1)}% Occupied</p>
// //     </div>
// //   );
// // };

// // const OccupancyStats = () => {
// //   const [stats, setStats] = useState([]);

// //   useEffect(() => {
// //     axios.get("http://localhost:8080/api/stats/occupancy")
// //       .then(res => setStats(res.data))
// //       .catch(err => console.error(err));
// //   }, []);

// //   return (
// //     <div className="flex flex-wrap justify-center mt-4">
// //       {stats.map(stat => (
// //         <OccupancyCard
// //           key={stat.locationName}
// //           location={stat.locationName}
// //           percent={stat.occupancyPercent}
// //         />
// //       ))}
// //     </div>
// //   );
// // };

// // export default OccupancyStats;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { PieChart, Pie, Cell, Tooltip } from "recharts";
// import NavigationBar from './../NavBar/NavigationBar';
// import './occupancyStats.css';

// // Colors for the pie chart
// const COLORS = ["#e74c3c", "#2ecc71"]; // Red for occupied, Green for free

// // Occupancy Card component
// const OccupancyCard = ({ location, percent }) => {
//   const data = [
//     { name: "Occupied", value: percent },
//     { name: "Free", value: 100 - percent }
//   ];

//   return (
//     <div className="occupancy-card">
//       <h3 className="card-title">{location}</h3>
//       <PieChart width={160} height={160} className="pie-chart">
//         <Pie
//           data={data}
//           cx="50%"
//           cy="50%"
//           innerRadius={40}
//           outerRadius={60}
//           paddingAngle={5}
//           dataKey="value"
//         >
//           {data.map((_, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index]} />
//           ))}
//         </Pie>
//         <Tooltip className="tooltip" />
//       </PieChart>
//       <p className="occupancy-text">{percent.toFixed(1)}% Occupied</p>
//     </div>
//   );
// };

// // Main Occupancy Stats component
// const OccupancyStats = () => {
//   const [stats, setStats] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:8080/api/stats/occupancy")
//       .then(res => setStats(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <div>
//       {/* Include the Navigation Bar here */}
//       <NavigationBar />
      
//       {/* Occupancy Stats Container */}
//       <div className="occupancy-stats-container">
//         <h2>Parking Occupancy Stats</h2> {/* Main heading */}
//         <div className="occupancy-stats-grid">
//           {stats.map(stat => (
//             <OccupancyCard
//               key={stat.locationName}
//               location={stat.locationName}
//               percent={stat.occupancyPercent}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OccupancyStats;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import NavigationBar from './../NavBar/NavigationBar';
import './occupancyStats.css';

// Colors for the pie chart
const COLORS = ["#e74c3c", "#2ecc71"]; // Red for occupied, Green for free

// Occupancy Card component
const OccupancyCard = ({ location, percent }) => {
  const data = [
    { name: "Occupied", value: percent },
    { name: "Free", value: 100 - percent }
  ];

  return (
    <div className="occupancy-card">
      {/* <h3 className="card-title">{location}</h3> */}
      <h3 className="card-title">{location.replace(/_/g, ' ')}</h3>
      <PieChart width={160} height={160} className="pie-chart">
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={60}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip className="tooltip" />
      </PieChart>
      <p className="occupancy-text">{percent.toFixed(1)}% Occupied</p>
    </div>
  );
};

// Main Occupancy Stats component
const OccupancyStats = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/stats/occupancy")
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      {/* Include the Navigation Bar here */}
      <NavigationBar />
      
      {/* Occupancy Stats Container */}
      <div className="occupancy-stats-container">
        <h2>Parking Occupancy Stats</h2> {/* Main heading */}
        <div className="occupancy-stats-grid">
          {stats.map((stat, index) => (
            <OccupancyCard
              key={`${stat.lotName}-${index}`}
              location={stat.lotName}
              percent={stat.occupancyPercent}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OccupancyStats;


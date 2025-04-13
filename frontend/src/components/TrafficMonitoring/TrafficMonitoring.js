import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import './TrafficMonitoring.css';
import Card from "./Card";
import NavigationBar from '../NavBar/NavigationBar';
import { Modal } from 'react-bootstrap';

const TrafficMonitoring = () => {
    const [liveTraffic, setLiveTraffic] = useState(null); // State is now an object, not an array
    const [historicalTraffic, setHistoricalTraffic] = useState([]);
    const [incidentCounts, setIncidentCounts] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchLocation, setSearchLocation] = useState("");
    const [locationInsights, setLocationInsights] = useState(null);

    useEffect(() => {
        getUserLocation(); // Get the user's current location on mount
        fetchHistoricalTraffic();
        fetchIncidentCounts();
    }, []);

    const fetchLiveTraffic = async (lat, lon) => {
        try {
            const response = await axios.get(`http://localhost:8080/traffic/location?lat=${lat}&lon=${lon}`);
            setLiveTraffic(response.data); // Store the response as an object
        } catch (error) {
            console.error("Error fetching live traffic data", error);
            setLiveTraffic(null); // Reset the state if an error occurs
        }
    };

    const fetchHistoricalTraffic = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/traffic/total");
            setHistoricalTraffic(response.data);
        } catch (error) {
            console.error("Error fetching historical traffic data", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchIncidentCounts = async () => {
        try {
            const response = await axios.get("http://localhost:8080/vehicle-regulation/count-by-type");
            setIncidentCounts(response.data);
        } catch (error) {
            console.error("Error fetching incident counts", error);
        }
    };

    // Fetches the latest traffic record where the location contains the given keyword
    const fetchLocationInsights = async () => {
        const locationname = searchLocation.trim();
        if (!locationname) return alert("Please enter a location name.");

        try {
            const response = await axios.get(`http://localhost:8080/traffic/locationname?locationname=${locationname}`);
            setLocationInsights(response.data);
        } catch (error) {
            console.error("Error fetching location-based data", error);
        }
    };

    const getUserLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            fetchLiveTraffic(latitude, longitude); // Fetch traffic data for the user's location
        }, (error) => {
            console.error("Error getting user location", error);
            alert("Failed to get your location.");
        });
    };

    const getTrafficTrend = (level) => {
        if (level >= 80) return "Heavy";
        if (level >= 40) return "Moderate";
        return "Light";
    };

    const getTrendColor = (level) => {
        if (level >= 80) return "heavy";
        if (level >= 40) return "moderate";
        return "light";
    };

    const calculateTravelTime = (level) => {
        // Simulate travel time based on congestion
        if (level >= 80) return 25;
        if (level >= 40) return 15;
        return 8;
    };

    return (
        <div>
            <NavigationBar />
            <div className="dashboard-container">
                <br />
                <div className="card map-card">
                    <MapContainer center={[17.385044, 78.486671]} zoom={12} className="map-container">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        />
                        {/* Check if liveTraffic is not null and contains the location and congestionLevel */}
                        {liveTraffic && liveTraffic.lat && liveTraffic.lon && liveTraffic.congestionLevel && (
                            <Polyline
                                positions={[[liveTraffic.lat, liveTraffic.lon]]} // Make sure lat and lon are valid
                                color={liveTraffic.congestionLevel >= 80 ? "red" : "green"}
                            />
                        )}


                    </MapContainer>
                </div>

                <div className="grid-container">
                    <div className="card">
                        <h2 className="card-title">🚨 Incidents</h2>
                        {Array.isArray(incidentCounts) && incidentCounts.length > 0 ? (
                            <table className="incident-table">
                                <thead>
                                    <tr>
                                        <th>Incident Type</th>
                                        <th>Count</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {incidentCounts.map((incident, index) => (
                                        <tr key={index}>
                                            <td>{incident.incidentType}</td>
                                            <td>{incident.count}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>Loading incidents...</p>
                        )}
                    </div>

                    {/* <div className="card">
                        <h2 className="card-title">Location-Based Insights</h2>
                        <input className="input-field" placeholder="Enter location" />
                        <button className="search-button">Search</button>
                        <p className="traffic-trend">Traffic Trends: <span className="moderate">Moderate</span></p>
                        <p>Average Travel Time: <span className="high-traffic">15 min</span></p>
                    </div> */}
                    <div className="card">
                        <h2 className="card-title">Location-Based Insights</h2>
                        <input
                            className="input-field"
                            placeholder="Enter latitude,longitude"
                            value={searchLocation}
                            onChange={(e) => setSearchLocation(e.target.value)}
                        />
                        <button className="search-button" onClick={fetchLocationInsights}>Search</button>
                        {locationInsights && (
                            <>
                                <p className="traffic-trend">
                                    Traffic Trends:{" "}
                                    <span className={getTrendColor(locationInsights.congestionLevel)}>
                                        {getTrafficTrend(locationInsights.congestionLevel)}
                                    </span>
                                </p>
                                <p>
                                    Average Travel Time:{" "}
                                    <span className="high-traffic">
                                        {calculateTravelTime(locationInsights.congestionLevel)} min
                                    </span>
                                </p>
                            </>
                        )}
                    </div>


                    {/* Historical Traffic Card with Show More Button */}
                    <div className="card">
                        <h2 className="card-title">Historical Traffic</h2>
                        {loading ? (
                            <p>Loading historical traffic data...</p>
                        ) : (
                            <>
                                <ul>
                                    {historicalTraffic.slice(0, 3).map((data, index) => (
                                        <li key={index} className="traffic-item">
                                            {data.location} - Congestion: {data.congestionLevel}%
                                        </li>
                                    ))}
                                </ul>
                                {historicalTraffic.length > 3 && (
                                    <button className="show-more-button" onClick={() => setModalOpen(true)}>
                                        Show More
                                    </button>
                                )}
                            </>
                        )}
                    </div>

                    <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Full Historical Traffic Data</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <table className="historical-traffic-table">
                                <thead>
                                    <tr>
                                        <th>Location</th>
                                        <th>Congestion Level (%)</th>
                                        <th>Timestamp</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {historicalTraffic.map((data, index) => (
                                        <tr key={index}>
                                            <td>{data.location}</td>
                                            <td>{data.congestionLevel}</td>
                                            <td>{new Date(data.timestamp).toLocaleString()}</td> {/* Format timestamp */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Modal.Body>
                        <Modal.Footer>
                            <button onClick={() => setModalOpen(false)}>Close</button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default TrafficMonitoring;

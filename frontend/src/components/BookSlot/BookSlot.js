import React, { useEffect, useState } from "react";
import './bookSlot.css';
import NavigationBar from "../NavBar/NavigationBar";
import axios from "axios";
import { useLocation } from "react-router-dom";

const BookSlot = () => {
    const location = useLocation();
    const { lotName } = location.state || {}; // Extract lotName from route state
    const [slotSelected, setSlotSelected] = useState(null);
    const [error, setErrorMessage] = useState('');
    const [availableSlots, setAvailableslots] = useState([]);

    // Fetch available slots when component mounts or when lotName changes
    useEffect(() => {
        console.log("Fetching available slots for lot:", lotName);
        axios.get(`/parking/available?lotName=${lotName}`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
        }).then((res) => {
            // Assuming res.data is an array of slot objects like { id, dateTime, available, lotID }
            setAvailableslots(res.data);
        }).catch((err) => {
            console.log("Error fetching available slots", err);
            setErrorMessage("Error fetching available slots.");
        });
    }, [lotName]);  // Triggered when lotName changes

    // Handle booking slot
    const handleBooking = () => {
        if (!slotSelected) {
            setErrorMessage("Please select a slot.");
            return;
        }

        // Update slot availability by PUT request
        axios.put(`/parking/${slotSelected}/availability`)
            .then((res) => {
                console.log("Booking successful", res);
                // After successful booking, update the slot status to unavailable
                setAvailableslots(prevSlots =>
                    prevSlots.map(slot =>
                        slot.id === slotSelected ? { ...slot, available: false } : slot
                    )
                );
                setErrorMessage('Slot booked successfully!');
            })
            .catch((err) => {
                console.log("Internal server error :: booking slot", err);
                setErrorMessage("Internal server error :: booking slot");
            });
    };

    return (
        <>
            <NavigationBar />
            <div className="display-slots-div">
                <div>
                    {/* Check if no slots are available */}
                    {availableSlots.length === 0 ? (
                        <div className="no-slots-message">
                            <span>No slots available at the moment.</span>
                        </div>
                    ) : (
                        <div className="inner-div">
                            {availableSlots.map((item) => (
                                <button
                                    key={item.id}  // Use item.id as the key for each button
                                    type="button"
                                    onClick={() => { setSlotSelected(item.id); }}  // Use item.id to set selected slot
                                    className={`slot-button 
                                        ${item.available ? 'slot-available' : 'slot-booked'} 
                                        ${slotSelected === item.id ? 'slot-selected' : ''}`}  // Add the 'slot-selected' class if it's selected
                                    disabled={!item.available}  // Disable button if slot is not available
                                >
                                    Slot {item.id} - {item.available ? 'Available' : 'Booked'}
                                </button>
                            ))}
                        </div>
                    )}
                    <br />
                    <div className="book-slot-button">
                        <button
                            type="button"
                            className="btn btn-danger"
                            style={{ alignContent: "center", width: '350px' }}
                            onClick={handleBooking}
                            disabled={!slotSelected}  // Disable the booking button if no slot is selected
                        >
                            Book Slot
                        </button>
                    </div>
                </div>
                {error && <span>{error}</span>}
            </div>
        </>
    );
};

export default BookSlot;
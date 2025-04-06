import React, { useEffect, useState } from "react";
import './bookSlot.css';
import NavigationBar from "../NavBar/NavigationBar";
import axios from "axios";
import { useLocation } from "react-router-dom";

const BookSlot = () => {
    let availableSlots = [1, 2, 3, 4, 5, 7, 9, 10];
    const location = useLocation();
    const { lotName } = location.state || {};
    const [slotSelected, setSlotSelected] = useState(null);
    const [error, setErrorMessage] = useState('');
    useEffect(() => {
        console.log("LOTNNAME", lotName);
        axios.get(`http://localhost:8080/parking/available?lotName=${lotName}`).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log("No Slots available", err);
        })
    })

    const handleBooking = () => {
        console.log("handleBooking called");
        if (!slotSelected) {
            console.log("slotttt", slotSelected);
        }
        console.log(slotSelected);
        axios.put(`http://localhost:8080/parking/${slotSelected}/availability`).then((res) => {
            console.log("received successful response");
            console.log(res);

        }).catch((err) => {
            console.log("Internal server error :: booking slot", err);
            setErrorMessage("Internal server error :: booking slot");
        })
    }
    return (
        <>
            <NavigationBar />
            <div className="display-slots-div">
                <div>
                    <div className="inner-div">
                        {availableSlots.map((item) => (
                            <button
                                key={item}
                                type="button"
                                onClick={() => { setSlotSelected(item); }}
                                className={slotSelected === item ? 'slot-selected' : ''}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                    <br></br>
                    <div className="book-slot-button">
                        <button
                            type="button"
                            class="btn btn-danger"
                            style={{ alignContent: "center", width: '350px' }}
                            onClick={() => handleBooking()}
                        >
                            Book Slot
                        </button>
                    </div>
                </div>
                {error && <span>{error}</span>}
            </div>
        </>
    )
}

export default BookSlot;
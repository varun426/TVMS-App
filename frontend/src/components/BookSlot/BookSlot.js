import React, { useEffect, useState } from "react";
import './bookSlot.css';
import NavigationBar from "../NavBar/NavigationBar";
import axios from "axios";
import { useLocation } from "react-router-dom";

const BookSlot = () => {
    const location = useLocation();
    const { lotName } = location.state || {};
    const [slotSelected, setSlotSelected] = useState(null);
    const [error, setErrorMessage] = useState('');
    const [availableSlots, setAvailableslots]= useState([1,2]);
    useEffect(() => {
        console.log("LOTNNAME", lotName);
        axios.get(`/parking/available?lotName=${lotName}`, {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"

            },
        }).then((res) => {
            setAvailableslots(res.data);
        }).catch((err) => {
            console.log("No Slots available", err);
        });
        console.log("ajhajkaa", availableSlots);
    }, [slotSelected])

    const handleBooking = () => {
        console.log("handleBooking called");
        if (!slotSelected) {
            console.log("slotttt", slotSelected);
        }
        console.log(slotSelected);
        axios.put(`/parking/${slotSelected}/availability`).then((res) => {
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
                                key={item.id}
                                type="button"
                                onClick={() => { setSlotSelected(item.id); }}
                                className={slotSelected === item.id ? 'slot-selected' : ''}
                            >
                                {item.id}
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
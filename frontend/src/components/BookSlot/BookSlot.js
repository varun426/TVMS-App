import React, { useState } from "react";
import './bookSlot.css';
import NavigationBar from "../NavBar/NavigationBar";

const BookSlot = () => {
    let availableSlots = [1, 2, 3, 4, 5, 7, 9, 10];
    const [slotSelected, setSlotSelected] = useState(null);
    return (
        <>
            <NavigationBar />
            <div className="display-slots-div">
                <div className="inner-div">
                    {availableSlots.map((item, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={()=> { setSlotSelected(index)}}
                            className={slotSelected === index ? 'slot-selected' : ''}
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
                    >
                        Book Slot
                    </button>
                </div>
            </div>
        </>
    )
}

export default BookSlot;
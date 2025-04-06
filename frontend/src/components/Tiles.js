import React from "react";
import './tiles.css';
import { Navigate, useNavigate } from "react-router-dom";
import NavigationBar from './NavBar/NavigationBar';

const content = [
  {
        src: 'assets/nexus.png',
        text: 'Nexus Mall',
  },
  {
        src: 'assets/amb.png',
        text: 'Sarath City Capital Mall',
  },
  {
        src: 'assets/continental.png',
        text: 'Continental Hospitals',
  },
  {
        src: 'assets/inorbit.png',
        text: 'Inorbit Mall',
  },
];

const Tiles = () => {
  const navigate = useNavigate();
  const checkAvailability = () => {
    navigate('/vehicle-regulate');
  };
  return (
    <>
      <NavigationBar />
      <div className="outer-div">
        <div className="inner-div">
          {content.map((item, index) => (
            <div key={index} className="tile">
              <img src={item.src} alt={item.text} className="image" />
              <span className="span">{item.text}</span>
              <button
                type="button"
                class="btn btn-danger"
                onClick={checkAvailability}
              >
                Check Availability
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Tiles;

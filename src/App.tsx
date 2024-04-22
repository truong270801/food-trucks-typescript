import React, { useState } from 'react';
import './App.css';
import { closePanel, openPanel } from "./Helper/PanelHelper";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import DistanceInputComponent from './component/DistanceInputComponent';
import MapContainerComponent from './component/MapContainerComponent';

function App() {
  const [radius, setRadius] = useState(1);
  

  return (
    <div className="wrapper">
      <div className="left-panel">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">
              <b>Food Trucks Finder</b>
              <i
                className="fa-solid fa-xmark"
                style={{ float: "right" }}
                onClick={closePanel}
              ></i>
            </h4>
          </div>
        </div>
        <DistanceInputComponent radius={radius} setRadius={setRadius} />
      </div>
      <div className="open-panel" onClick={openPanel}>
        <i className="fa-sharp fa-solid fa-bars"></i>
      </div>
      <MapContainerComponent radius={radius} />
    </div>
  );
}

export default App;

import './App.css';
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { loadLocationIcon } from "./Helper/MapHelper";
import { fetchData,initializeMap,  createFeatures, addDataToMap } from "./Helper/DataHelper";
import { closePanel, openPanel } from "./Helper/PanelHelper";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const mapContainer = useRef<any>(null);
  const [radius, setRadius] = useState<number>(1);

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || "";
    const map: mapboxgl.Map = initializeMap(mapContainer.current);

    map.on("load", () => {
      loadLocationIcon(map);
    });

    fetchData(process.env.REACT_APP_API_URL || "")
      .then((jsonData: any) => {
        const filteredFeatures = createFeatures(jsonData, radius);
        addDataToMap(map,  filteredFeatures);
      })
      .catch((error: Error) => {
        console.error("Error fetching data:", error);
      });

    return () => map.remove();
  }, [radius]);

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
        <div className="content">
          <b>
            DISTANCE:
            <input
  type="number"
  id="radius"
  min="0"
  step="0.1"
  value={radius || ''} 
  onChange={(e) => setRadius(parseFloat(e.target.value))}
/>

            Km
          </b>
        </div>
      </div>
      <div className="open-panel" onClick={openPanel}>
        <i className="fa-sharp fa-solid fa-bars"></i>
      </div>
      <div ref={mapContainer} className="map-container"></div>
    </div>
  );
}

export default App;

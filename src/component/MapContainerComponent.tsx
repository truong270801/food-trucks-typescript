import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { fetchData, initializeMap, addDataToMap, createFeatures, addMyLocation } from '../Helper/DataHelper';

interface MapContainerProps {
  radius: number;
}

function MapContainerComponent({ radius }: MapContainerProps) {
  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || "";
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || "";
    const mapContainer = document.getElementById("map-container");

    if (mapContainer) {
      const map = initializeMap(mapContainer.id);

      map.on("load", () => {
        addMyLocation(map);

      });
      if (radius || '') {
        fetchData(apiUrl)
          .then((jsonData: any) => {
            const filteredFeatures = createFeatures(jsonData,radius);

<<<<<<< HEAD
            addDataToMap(map, filteredFeatures);
          })
      } else {
        setTimeout(function() {
          alert("Please enter space");
      }, 500);
      
=======
      fetchData(apiUrl)
        .then((jsonData: any) => { 
          const filteredFeatures = createFeatures(jsonData, radius); 
          addDataToMap(map, filteredFeatures);
        })
        .catch((error: Error) => { 
          console.error("Error fetching data:", error);
        });
>>>>>>> bf7f3732beae0ca84f0355abe4ce14958fe34168

      }
      return () => map.remove();
    }
  }, [radius]);

  return <div id="map-container" className="map-container" ></div>;
}


export default React.memo(MapContainerComponent);

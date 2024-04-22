import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import {fetchData, initializeMap, addDataToMap , createFeatures} from '../Helper/DataHelper';
import { loadLocationIcon } from '../Helper/MapHelper';

interface MapContainerProps {
  radius: number;
}

function MapContainerComponent({radius}: MapContainerProps) {
  useEffect(() => {
    const apiUrl=process.env.REACT_APP_API_URL || "";
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || "";
    const mapContainer = document.getElementById("map-container");
    if (mapContainer) {
      const map = initializeMap(mapContainer.id);

      map.on("load", () => {
        loadLocationIcon(map);
      });

      fetchData(apiUrl)
        .then((jsonData: any) => { 
          const filteredFeatures = createFeatures(jsonData, radius); // Đảm bảo rằng bạn đã import createFeatures
          addDataToMap(map, filteredFeatures);
        })
        .catch((error: Error) => { // Xác định kiểu dữ liệu của error
          console.error("Error fetching data:", error);
        });

      return () => map.remove();
    }
  }, [radius]);

  return <div id="map-container" className="map-container"></div>;
}

export default React.memo(MapContainerComponent);

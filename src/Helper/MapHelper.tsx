import mapboxgl from "mapbox-gl";



export function loadLocationIcon(map: mapboxgl.Map) {
  map.loadImage(require("../assets/image/mylocation.png"), (error: any, image: any) => {
    if (error) throw error;
    map.addImage("location-icon", image);
    map.addSource("my-location-src", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-122.40945776860957, 37.7653468958055],
            },
            properties: {
              name: "My Location",
            },
          },
        ],
      },
    });
    map.addLayer({
      id: "my-location",
      type: "symbol",
      source: "my-location-src",
      layout: {
        "icon-image": "location-icon",
        "icon-size": 0.9,
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,
      },
    });
  });
}


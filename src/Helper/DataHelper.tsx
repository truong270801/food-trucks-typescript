import mapboxgl from 'mapbox-gl';
import React from 'react';

export async function fetchData<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export function addDataToMap(map: mapboxgl.Map, features: any[]): void {
 
  map.addSource("food-truck-source", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: features,
      },
    });
   
    map.loadImage(require("../assets/image/location.png"), (error: any, image: any) => {
      if (error) throw error;
      map.addImage("truck-icon", image);
      map.addLayer({
        id: "food-truck-points", 
        type: "symbol",
        source: "food-truck-source",
        layout: {
          "icon-image": "truck-icon",
          "icon-size": 0.7,
          "icon-allow-overlap": true,
          "icon-ignore-placement": true,
        },
      });
    });
    
    map.on("click", "food-truck-points", function (e) {
      if (!e.features || e.features.length === 0) {
        return;
      }
    
      const feature = e.features[0];
      if (feature.geometry.type !== "Point" || !feature.properties) {
        return;
      }
    
      map.on('click', 'food-truck-points', function () {
        const coordinates: [number, number] = features[0].geometry.coordinates as [number, number];
        const name: string = features[0].properties.applicant;
        const foodItems: string = features[0].properties.fooditems;
        const facilityType: string = features[0].properties.facilitytype;
        const Address: string = features[0].properties.address;
        const locationDescription: string = features[0].properties.locationdescription;
        const Status: string = features[0].properties.status;
        const Dayshours: string = features[0].properties.dayshours;
        const Expirationdate: string = features[0].properties.expirationdate;
        const Approved: string = features[0].properties.approved;
  
        new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(`<h3>${name}</h3><p><b>Facility Type: </b>${facilityType}</p><p><b>Address: </b>${Address}</p><p><b>Food Items: </b>${foodItems}</p><p><b>Location Description: </b>${locationDescription}</p><p><b>Status: </b><i>${Status}</i></p><p><b>Days hours: </b>${Dayshours}</p><p><b>Approved: </b>${Approved}</p><p><b>Expiration date: </b>${Expirationdate}</p>`)
        .addTo(map);
      
      });
     
  
    });
    
  }  
export function calculateDistance(
 lat1: number,lon1: number,lat2: number,lon2: number
): number {
  const R = 6371; 
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; 
  return distance;
}

export function createFeatures(truckData: any[], radius: number): any[] {
  return truckData
    .map((truck) => {
      const truckLat = parseFloat(truck.latitude);
      const truckLon = parseFloat(truck.longitude);
      const dist = calculateDistance(
        37.7653468958055,
        -122.40945776860957,
        truckLat,
        truckLon
      );
      if (dist <= radius) {
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [truckLon, truckLat],
          },
          properties: {
            applicant: truck.applicant,
            fooditems: truck.fooditems,
            facilitytype: truck.facilitytype,
            address: truck.address,
            locationdescription: truck.locationdescription,
            status: truck.status,
            dayshours: truck.dayshours,
            expirationdate: truck.expirationdate,
            approved: truck.approved,
          },
        };
        
      } else {
        return null;
      }
    })
    .filter((feature) => feature !== null);


    
}


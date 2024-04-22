import mapboxgl from 'mapbox-gl';
let marker: any = null;

let myLat: number = 37.7653468958055;
let myLon: number = -122.40945776860957;
export function initializeMap(container: string) {
  const map = new mapboxgl.Map({
    container: container,
    style: "mapbox://styles/mapbox/streets-v11",
    center: [myLon, myLat],
    zoom: 12,
    hash: false
  });

  map.on('click', async (e) => {
    const { lng, lat } = e.lngLat;
    myLon = lng;
    myLat = lat;
    if (marker) {
      marker.remove();
    }
    map.flyTo({
      center: [myLon, myLat],
      zoom: 12,
      essential: true
    });
    addMyLocation(map);
  });

  return map;
}

export function addMyLocation(map: mapboxgl.Map) {
  if (marker) {
    marker.remove();
  }
  marker = new mapboxgl.Marker()
    .setLngLat([myLon, myLat])
    .addTo(map);
}

export async function fetchData(url: string) {
  try {

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export function createFeatures(truckData: any[], radius: number): any[] {
  const features = truckData.map((truck) => {
    const truckLat = parseFloat(truck.latitude);
    const truckLon = parseFloat(truck.longitude);
    const dist = calculateDistance(myLat, myLon, truckLat, truckLon);
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
  }).filter((feature) => feature !== null);
 
 
  return features;
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
  map.on('click', 'food-truck-points', function (e: any) {
    const coordinates: [number, number] = e.features[0].geometry.coordinates as [number, number];
    const name: string = e.features[0].properties.applicant;
    const foodItems: string = e.features[0].properties.fooditems;
    const facilityType: string = e.features[0].properties.facilitytype;
    const Address: string = e.features[0].properties.address;
    const locationDescription: string = e.features[0].properties.locationdescription;
    const Status: string = e.features[0].properties.status;
    const Dayshours: string = e.features[0].properties.dayshours;
    const Expirationdate: string = e.features[0].properties.expirationdate;
    const Approved: string = e.features[0].properties.approved;

    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(`<h3>${name}</h3><p><b>Facility Type: </b>${facilityType}</p><p><b>Address: </b>${Address}</p><p><b>Food Items: </b>${foodItems}</p><p><b>Location Description: </b>${locationDescription}</p><p><b>Status: </b><i>${Status}</i></p><p><b>Days hours: </b>${Dayshours}</p><p><b>Approved: </b>${Approved}</p><p><b>Expiration date: </b>${Expirationdate}</p>`)
      .addTo(map);
  });

}
function calculateDistance(
  lat1: number, lon1: number, lat2: number, lon2: number
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

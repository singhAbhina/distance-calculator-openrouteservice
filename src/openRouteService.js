import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.ORS_API_KEY;

export async function getDistanceFromORS(origin, destination) {
  const url = 'https://api.openrouteservice.org/v2/directions/driving-car';
  const headers = {
    'Authorization': apiKey,
    'Content-Type': 'application/json',
  };
  const body = {
    coordinates: [
      [origin.lng, origin.lat],
      [destination.lng, destination.lat],
    ],
  };

  try {
    const response = await axios.post(url, body, { headers });
    const distance = response.data.routes[0].summary.distance / 1000; // in kilometers
    const duration = response.data.routes[0].summary.duration / 60;   // in minutes

    return {
      distance: `${distance.toFixed(2)} km`,
      duration: `${duration.toFixed(2)} mins`
    };
  } catch (error) {
    console.error('Failed to fetch distance:', error.message);
    throw error;
  }
}
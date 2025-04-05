import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const ORS_API_KEY = process.env.ORS_API_KEY;

const geocode = async (place) => {
  const url = `https://api.openrouteservice.org/geocode/search`;
  const response = await axios.get(url, {
    params: {
      api_key: ORS_API_KEY,
      text: place,
      size: 1,
    },
  });

  if (
    response.data.features &&
    response.data.features.length > 0 &&
    response.data.features[0].geometry
  ) {
    return response.data.features[0].geometry.coordinates; // [lon, lat]
  } else {
    throw new Error(`Could not geocode location: ${place}`);
  }
};

const getDistance = async (originName, destinationName) => {
  try {
    const originCoords = await geocode(originName);
    const destinationCoords = await geocode(destinationName);

    const url = `https://api.openrouteservice.org/v2/directions/driving-car`;
    const response = await axios.post(
      url,
      {
        coordinates: [originCoords, destinationCoords],
      },
      {
        headers: {
          Authorization: ORS_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    const { summary } = response.data.routes[0];
    return {
      distance: `${(summary.distance / 1000).toFixed(2)} km`,
      duration: `${(summary.duration / 60).toFixed(2)} mins`,
    };
  } catch (err) {
    console.error('Failed to fetch distance:', err.message);
    throw err;
  }
};

export default getDistance;

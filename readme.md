# distance-calculator-openrouteservice

A simple Node.js package to calculate driving distance and time between two place names using the free OpenRouteService API.

## Installation

```bash
npm install distance-calculator-openrouteservice
   ## Author-Abhinav Singh IIIT Manipur

   ##how to use 
   import getDistance from 'distance-calculator-openrouteservice';

getDistance('Delhi', 'Mumbai').then(console.log).catch(console.error);


##output shows
{
  distance: '1467.32 km',
  duration: '17 hr 57 min'
}


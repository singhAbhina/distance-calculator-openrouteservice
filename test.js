import getDistance from './src/index.js';

getDistance("Gorakhpur", "Imphal")
  .then(result => {
    console.log("Distance Info:", result);
  })
  .catch(err => {
    console.error("Error:", err.message);
  });

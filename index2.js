const {nextISSTimesForMyLocation, printFlyTimes} = require('./iss_promised');
nextISSTimesForMyLocation()
.then((flyovers) => {
  printFlyTimes(flyovers);
})
.catch((error) => {
  console.log(`Error:`,error.message);
});
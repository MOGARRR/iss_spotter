const {nextISSTimesForMyLocation,printFlyTimes} = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  error? console.log("It didn't work!", error) : printFlyTimes(passTimes);
});
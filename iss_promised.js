const needle = require('needle');

const fetchMyIp = () => {
  return needle('get','https://api.ipify.org/?format=json')
  .then((response) => {
    const body = response.body;
    const ip = body.ip;
    return ip;
  });
};

const fetchCoordsByIP = (ip) => {
  return needle('get',`http://ipwho.is/${ip}`)
  .then((response) => {
    const body = response.body;
    const coordinates ={latitude: body.latitude, longitude: body.longitude};
    return coordinates;
  });
}

const fetchISSFlyOverTimes = (coords) => {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  return needle('get',url)
  .then((response) => {
    const body = response.body;
    const flyovers = body.response;
    return flyovers;
  });
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIp()
  .then((ip) => fetchCoordsByIP(ip))
  .then((coords) => fetchISSFlyOverTimes(coords))
  .then((flyovers) => {
    return flyovers;
  });
}
const printFlyTimes = (flyOvers) => {
  for (const object of  flyOvers) {
    const day = new Date(0);
    day.setUTCSeconds(object.risetime);
    const duration = object.duration;
    console.log(`Next pass at ${day} for ${duration} seconds!`);
  }
};


module.exports = {nextISSTimesForMyLocation,printFlyTimes};
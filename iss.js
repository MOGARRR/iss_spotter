const needle = require("needle");

const fetchMyIp = (callback) => {
  needle.get('https://api.ipify.org/?format=json',(error,response,body) =>{ // sends request to url
    if (error !== null) return callback(error,null); // sends error if it occurs
    
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching the ip. Response ${body}`;
      return callback(Error(msg),null);
    }
    return callback(null,body.ip);
  });
};

const fetchCoordsByIP = (ip,callback) => {
  needle.get(`http://ipwho.is/${ip}`, (error,response,body) => {
    if (error !== null) return callback(error,null);

    if (!body.success) {
      const msg = `Unsuccessful when fetching the coordinates due to: (${body.message}: ${ip})`;
      return callback(Error(msg),null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching the ip. Response ${body}`;
      return callback(Error(msg),null);
    }
      
    const coordinates = {latitude: body.latitude, longitude: body.longitude};
    return callback(null, coordinates);
  });

};

const fetchISSFlyOverTimes = (coords,callback) => {
  needle.get(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error,response,body) => {
    if (error !== null) return callback(error,null);
    
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching ISS fly times due to:(${body}: ${coords})`;
      return callback(Error(msg),null);
    }
    const flyOvers = body.response;
    return callback(null,flyOvers);
  });

};

const nextISSTimesForMyLocation = (callback) => {
 
  const flyoverArray = fetchMyIp((error,ip) =>{
    if (error) {
      return callback(error,null);
    }
    fetchCoordsByIP(ip,(error,coords) =>{
      if (error) {
        return callback(error,null);
      }
       fetchISSFlyOverTimes(coords,(error,flyOvers) => {
        if (error) {
          return callback(error,null);
        }
        callback(null,flyOvers);
       });
    });
  });
};
const printFlyTimes = (flyOvers) => {
  for (const obj of  flyOvers){
    const day = new Date(0);
    day.setUTCSeconds(obj.risetime);
    const duration = obj.duration;
    console.log(`Next pass at ${day} for ${duration} seconds!`);
  }
};

module.exports = {nextISSTimesForMyLocation, printFlyTimes};

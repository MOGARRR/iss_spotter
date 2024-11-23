const needle = require("needle");

const fetchMyIp = (callback) => {
  needle.get('https://api.ipify.org/?format=json',(error,response,body) =>{
    if (error !== null) return callback(error,null);
    
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
    const coordinates = {latitude: body.latitude, longitude: body.longitude};
    return callback(null,coordinates);
  });

};
module.exports = {fetchMyIp,fetchCoordsByIP};
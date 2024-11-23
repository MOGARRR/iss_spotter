const needle = require("needle");

const fetchMyIp = (callback) => {
  needle.get('https://api.ipify.org/?format=json',(error,response,body) =>{
    if (error !== null) return callback(error,null);
    
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching the ip. Response ${body}`;
      return callback(Error(msg),null);
    }
    
    const ip = JSON.stringify(body.ip);
    return callback(null,ip);
  });
};
module.exports = {fetchMyIp};
const {fetchMyIp,fetchCoordsByIP,fetchISSFlyOverTimes} = require('./iss');

// fetchMyIp((error,ip) => {
//   error ? console.log('Didnt work!!',error) : console.log('it worked!IP returned:',ip);
//   });
// fetchCoordsByIP('3',(error,data) => {
//   error ? console.log(`Didnt work!! ${error}`) : console.log(`Got the coordinates! its ${data}`);
// });

// fetchISSFlyOverTimes({"latitude":541.0486151,"longitude":0}, (error,data) => {
//   error ? console.log(`Didnt work!! ${error}`) : console.log(`Got the ISS fly times! its ${data}`);
// });
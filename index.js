const {fetchMyIp,fetchCoordsByIP} = require('./iss');

// fetchMyIp((error,ip) => {
//   if (error) {
//     console.log('Didnt work!!',error);
//     return;
//   } else {
//     console.log('it worked!IP returned:',ip);
//     return ip;
//   }
// });
// fetchCoordsByIP('43',(error,data) => {
//   error ? console.log(`Didnt work!! ${error}`) : console.log(`Got the coordinates! its ${data}`);
// });
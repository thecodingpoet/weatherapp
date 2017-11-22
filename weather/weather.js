const request = require('request');
const dotenv = require('dotenv');
dotenv.config();

const getWeather = (lat, lon, callback) => {
  request({
    url: `https://api.darksky.net/forecast/${process.env.API_KEY}/${lat},${lon}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else {
      callback('Unable to fetch weather');
    } 
  });
}
 
module.exports.getWeather = getWeather;

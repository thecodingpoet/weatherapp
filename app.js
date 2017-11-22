const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs 
              .options({
                a: {
                  demand: true,
                  alias: 'address',
                  describe: 'Address to fetch weather for',
                  string: true
                }
              })
              .help()
              .alias('help', 'h')
              .argv;

geocode.geocodeAddress(argv.address, (errorMesage, results) => {
  if(errorMesage) {
    console.log(errorMesage);
  } else {
    console.log(results.address);
    weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
      if(errorMessage) {
        console.log(errorMesage);
      } else {
        console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}`);
      } 
    });
  }
});
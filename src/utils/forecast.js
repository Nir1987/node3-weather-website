const request = require('postman-request');

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a5f1df697ff739094501570b817516ce&query=' + longitude + ',' + latitude + '&units=f';
    const json = true;
    request({url, json}, (error, {body} = {} ) => {
        if (error) {
            callback('Unable to connect to weather service');
        } else if (body.error) {
            callback('Unable to find weather for the given location');
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + '. It feels like ' + body.current.feelslike + ' degrees out.');
        }
    })
}

module.exports = forecast;
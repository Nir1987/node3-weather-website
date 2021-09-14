const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibmlyLW5vZGUtY291cnNlIiwiYSI6ImNrc3owdXFoYzF1cWsycWxzbTAzdHJncnkifQ.NOLTgZqy_rVUiHlEasCnKA&limit=1';
    const json = true;
    request({ url, json }, (error, {body} = {} ) => {
        if (error) {
            callback('Unable to connect to location services !');
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.');
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
    })
}

module.exports = geocode;
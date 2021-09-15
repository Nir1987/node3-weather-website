const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Andrew Mead'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Andrew Mead'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help menu',
        name: 'Andrew Mead',
        helpMessage: 'This is a helpful message'
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        });
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
        if (error) {
            return res.send({
                error
            });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                });
            }
            res.send({
                forecast: forecastData,
                address: req.query.address,
                location
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help menu',
        name: 'Andrew Mead',
        errorMessage: 'The requested help article could not be found'
    });})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        name: 'Andrew Mead',
        errorMessage: 'The requested page could not be found'
    });
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const myName = "David B. Reusch"

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

// home page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: myName
    })
})

// About page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: myName
    })
})

// Help page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        helpText: 'This is some helpful text!',
        name: myName
    })
})

// Weather page
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'weather: You must provide a search term'
        })
    }

    const address = req.query.address
    geocode(address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({
                error: 'geocode error:', error
            })
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: 'forecast error:', error
                })
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: address
            })

        })
    })

})

// Missing help articles page
app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found',
        title: '404 Help',
        name: myName
    })
})

// 404 response page
app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found',
        title: '404',
        name: myName
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
// Geocoding
// Address -> Lat/Long

require('dotenv').config()
const request = require('postman-request')

const geocode = (address, callback) => {
    const geoApiKey = process.env.GEO_API_KEY
    const geoURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + geoApiKey + '&limit=1'

    request({ url: geoURL, json: true }, (error, { body }) => {
        if (error) {
            callback('geocode: Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('geocode: Unable to find location. Try another search.', undefined)
        } else {
            const { features: { 0: { center: { 0: longitude, 1: latitude }, place_name: location } } } = body
            callback(undefined, {
                longitude,
                latitude,
                location
            })
        }

    })
}

module.exports = geocode
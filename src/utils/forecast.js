// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

require('dotenv').config()
const request = require('postman-request')

const forecast = (longitude, latitude, callback) => {
    const wxApiKey = process.env.WX_API_KEY
    const wxURL = 'http://api.weatherstack.com/current?access_key=' + wxApiKey + '&query=' + latitude + ',' + longitude + '&units=f'

    request({ url: wxURL, json: true }, (error, { body }) => {
        if (error) { // error exists for LOWEST level problems, like no network
            callback('forecast: Unable to connect to weather service!', undefined)
        }
        else if (body.error) { // otherwise look at response.body.error
            callback('forecast: Unable to find location!', undefined)
        } else {
            const { weather_descriptions: {0: weatherDescription}, temperature, feelslike: feelsLike, cloudcover: cloudCover } = body.current

            const data = weatherDescription + '. It is currently ' + temperature + ' degrees out.  It feels like ' + feelsLike + ' degrres out.  Cloud cover is ' + cloudCover + '%.'

            callback(undefined, data)
        }
    })
}

module.exports = forecast
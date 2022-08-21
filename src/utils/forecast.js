
const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c0764e0efa31520505ab5d190d5a62b0&query='+latitude+','+longitude;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined,undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined,undefined)
        } else {
            callback(undefined,  ' It is currently ' + body.current.temperature + ' degress out. It is '+body.current.weather_descriptions[0]+'. There is a ' + body.current.precip + '% chance of rain.',body.current.weather_icons[0])
        }
    })
}

module.exports = forecast
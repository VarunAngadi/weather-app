
const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+address+'&APPID=ccf7d74d116f9584c55ba656eb8875b4'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.cod ==400) {
            callback(body.message, undefined)
        } else {
            callback(undefined, {
                latitude: body.coord.lat,
                longitude: body.coord.lon,
                location: body.name
            })
        }
    })
}

module.exports = geocode
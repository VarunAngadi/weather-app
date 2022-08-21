const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

app.get('/weather',(req,res)=>{
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    } 
        geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
            if (error) {
                return res.send({ error })
    
            }
           
            forecast(latitude, longitude, (error, forecastData,srce) => {
                if (error) {
                    return res.send({ error })
                }
    
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address,
                    srce
                })
            })
        })
    
    
})



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


















// const address = process.argv[2]



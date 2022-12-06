//js
require('dotenv').config() //To access local environment variables
const express = require('express')
const ejs = require('express-ejs-layouts')
const conn = require('./configs/db')
const App = express()



App.set('view engine', 'ejs')
// Set the views directory
App.use(ejs)

// receive json data
App.use(express.json({ extended: true }))

// Set the public directory
App.use('/assets', express.static('assets'))

// Set the routes
App.use('/', require('./routes/index'))

// connect to db [Note: you must provide the connection URI first in (.env) file]
conn()

const PORT = process.env.PORT || 3011

App.listen(PORT, console.log("Server has started at port " + PORT))
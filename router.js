const express = require('express')

const router = express.Router()
const start = require('./routes/start.js')
const actors = require('./routes/actors.js')
const movies = require('./routes/movies.js')

router.use('/', start, actors, movies)

module.exports = router

const express = require('express')

const start = express.Router()

start.get('/', (req, res) => {
    res.send(
        '/movies <br> /actors <br> /movies/id <br> /actors/id <br> /actorsbymovie?movie=(title here) <br> /moviesbyactor?actor=(actor here)'
    )
})

module.exports = start

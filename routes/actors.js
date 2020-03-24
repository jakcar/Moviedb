const express = require('express')
const pool = require('../pool.js')

const actors = express.Router()

// Hämtar all data i actors-tabellen
actors.get('/allactors', (req, res) => {
    let query = `SELECT * FROM actors`

    pool((err, connection) => {
        connection.query(query, (err, result, fields) => {
            connection.release()

            if (err) throw err

            res.send(result)
        })
    })
})

// Hämtar, uppdaterar eller tar bort skådespelare baserat på id-värde
actors
    .route('/actors/:id')
    .get((req, res) => {
        let query = `SELECT firstName, lastName FROM actors WHERE id = ?`
        const { id } = req.params

        pool((err, connection) => {
            connection.query(query, id, (err, result, fields) => {
                connection.release()

                if (err) throw err

                res.send(result)
            })
        })
    })
    .put((req, res) => {
        let query = `UPDATE actors
        SET firstName = ?, lastName = ?
        WHERE id = ?`

        const newData = [req.body.firstName, req.body.lastName, req.params.id]

        pool((err, connection) => {
            connection.query(query, newData, (err, result, fields) => {
                connection.release()

                if (err) throw err

                res.send(result)
            })
        })
    })
    .delete((req, res) => {
        let query = `DELETE FROM actors WHERE actors.id = ?`

        const { id } = req.params

        pool((err, connection) => {
            connection.query(query, id, (err, result, fields) => {
                connection.release()

                if (err) throw err

                res.send(result)
            })
        })
    })

// Hämtar alla skådespelare och listar vilka filmer de är med i, lägger till ny skådespelare
actors
    .route('/actors')
    .get((req, res) => {
        let query = `SELECT  CONCAT(firstName, ' ', lastName) AS Actor, GROUP_CONCAT(title) AS Movies
        FROM titles
        JOIN actors_titles ON titles.id = actors_titles.title_id
        JOIN actors ON actors.id = actors_titles.actor_id
        GROUP BY Actor`
        pool((err, connection) => {
            connection.query(query, (err, result, fields) => {
                connection.release()

                if (err) throw err

                res.send(result)
            })
        })
    })
    .post((req, res) => {
        let query = 'INSERT INTO actors (firstName, lastName) VALUES (?, ?)'

        const newData = [req.body.firstName, req.body.lastName]

        pool((err, connection) => {
            connection.query(query, newData, (err, result, fields) => {
                connection.release()

                if (err) throw err

                res.send(result)
            })
        })
    })

// Listar alla skådespelare som medverkar i vald film (matas in som querystring)
actors.get('/actorsbymovie/', (req, res) => {
    let movieTitle = req.query.movie
    let query = `SELECT firstName, lastName
    FROM titles
    JOIN actors_titles ON titles.id = actors_titles.title_id
    JOIN actors ON actors.id = actors_titles.actor_id
    WHERE titles.title = ?`

    pool((err, connection) => {
        connection.query(query, movieTitle, (err, result, fields) => {
            connection.release()

            if (err) throw err

            res.send(result)
        })
    })
})

module.exports = actors

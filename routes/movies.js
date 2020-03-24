const express = require('express')
const pool = require('../pool.js')

const movies = express.Router()

// Hämtar all data i movies-tabellen
movies.get('/allmovies', (req, res) => {
    let query = `SELECT * FROM titles`

    pool((err, connection) => {
        connection.query(query, (err, result, fields) => {
            connection.release()

            if (err) throw err

            res.send(result)
        })
    })
})

// Hämtar, uppdaterar eller tar bort filmer baserat på id-värde
movies
    .route('/movies/:id')
    .get((req, res) => {
        let query = `SELECT title, year FROM titles WHERE id = ?`
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
        let query = `UPDATE titles
        SET title = ?, year = ?
        WHERE id = ?`

        const newData = [req.body.title, req.body.year, req.params.id]

        pool((err, connection) => {
            connection.query(query, newData, (err, result, fields) => {
                connection.release()

                if (err) throw err

                res.send(result)
            })
        })
    })
    .delete((req, res) => {
        let query = `DELETE FROM titles WHERE id = ?`
        let { id } = req.params

        pool((err, connection) => {
            connection.query(query, id, (err, result, fields) => {
                connection.release()

                if (err) throw err

                res.send(result)
            })
        })
    })

// Hämtar alla filmer och listar vilka skådespelare som medverkar, lägger till ny film
movies
    .route('/movies')
    .get((req, res) => {
        let query = `SELECT  title AS Title, GROUP_CONCAT(CONCAT(firstName, ' ', lastName)) AS Actors, year AS Released
        FROM titles
        JOIN actors_titles ON titles.id = actors_titles.title_id
        JOIN actors ON actors.id = actors_titles.actor_id
        GROUP BY title, year `
        pool((err, connection) => {
            connection.query(query, (err, result, fields) => {
                connection.release()

                if (err) throw err

                res.send(result)
            })
        })
    })
    .post((req, res) => {
        let query = 'INSERT INTO titles (title, year) VALUES (?, ?)'

        const newData = [req.body.title, req.body.year]

        pool((err, connection) => {
            connection.query(query, newData, (err, result, fields) => {
                connection.release()

                if (err) throw err

                res.send(result)
            })
        })
    })

movies.get('/moviesbyactor/', (req, res) => {
    let actorName = req.query.actor
    let query = `SELECT title
    FROM titles
    JOIN actors_titles ON titles.id = actors_titles.title_id
    JOIN actors ON actors.id = actors_titles.actor_id
    WHERE CONCAT(actors.firstname, ' ', actors.lastName) = '${actorName}'`

    pool((err, connection) => {
        connection.query(query, (err, result, fields) => {
            connection.release()

            if (err) throw err

            res.send(result)
        })
    })
})

module.exports = movies

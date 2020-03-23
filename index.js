const express = require('express')

const app = express()
const pool = require('./pool.js')

app.use(express.json())

app.get('/', (req, res) => {
    res.send(
        '/movies <br> /actors <br> /movies/id <br> /actors/id <br> /actorsbymovie?movie=(title here) <br> /moviesbyactor?actor=(actor here)'
    )
})

app.get('/allmovies', (req, res) => {
    let query = `SELECT * FROM titles`

    pool((err, connection) => {
        connection.query(query, (err, result, fields) => {
            connection.release()

            if (err) throw err

            res.send(result)
        })
    })
})

app.get('/allactors', (req, res) => {
    let query = `SELECT * FROM actors`

    pool((err, connection) => {
        connection.query(query, (err, result, fields) => {
            connection.release()

            if (err) throw err

            res.send(result)
        })
    })
})

app.route('/movies/:id')
    .get((req, res) => {
        let query = `SELECT title, year FROM titles WHERE titles.id = '${req.params.id}'`

        pool((err, connection) => {
            connection.query(query, (err, result, fields) => {
                connection.release()

                if (err) throw err

                res.send(result)
            })
        })
    })
    .put((req, res) => {
        let query = `UPDATE titles 
        SET title = '${req.body.title}', year = '${req.body.year}', id = '${req.params.id}'
        WHERE titles.id = '${req.params.id}'`

        pool((err, connection) => {
            connection.query(query, (err, result, fields) => {
                connection.release()

                if (err) throw err

                res.send(result)
            })
        })
    })
    .delete((req, res) => {
        let query = `DELETE FROM titles WHERE titles.id = '${req.params.id}'`

        pool((err, connection) => {
            connection.query(query, (err, result, fields) => {
                connection.release()

                if (err) throw err

                res.send(result)
            })
        })
    })

app.route('/actors/:id')
    .get((req, res) => {
        let query = `SELECT firstName, lastName FROM actors WHERE actors.id = '${req.params.id}'`

        pool((err, connection) => {
            connection.query(query, (err, result, fields) => {
                connection.release()

                if (err) throw err

                res.send(result)
            })
        })
    })
    .put((req, res) => {
        let query = `UPDATE actors 
        SET firstName = '${req.body.firstName}', lastName = '${req.body.lastName}', id = '${req.params.id}'
        WHERE actors.id = '${req.params.id}'`

        pool((err, connection) => {
            connection.query(query, (err, result, fields) => {
                connection.release()

                if (err) throw err

                res.send(result)
            })
        })
    })
    .delete((req, res) => {
        let query = `DELETE FROM actors WHERE actors.id = '${req.params.id}'`

        pool((err, connection) => {
            connection.query(query, (err, result, fields) => {
                connection.release()

                if (err) throw err

                res.send(result)
            })
        })
    })

app.route('/movies')
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
        let { title } = req.body
        let { year } = req.body
        let query = 'INSERT INTO titles (title, year) VALUES (?, ?)'

        pool((err, connection) => {
            connection.query(query, [title, year], (err, result, fields) => {
                connection.release()

                if (err) throw err

                res.send(result)
            })
        })
    })

app.route('/actors')
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
        let { firstName } = req.body
        let { lastName } = req.body
        let query = 'INSERT INTO actors (firstName, lastName) VALUES (?, ?)'

        pool((err, connection) => {
            connection.query(query, [firstName, lastName], (err, result, fields) => {
                connection.release()

                if (err) throw err

                res.send(result)
            })
        })
    })

app.get('/actorsbymovie/', (req, res) => {
    let movieTitle = req.query.movie
    let query = `SELECT firstName, lastName 
    FROM titles 
    JOIN actors_titles ON titles.id = actors_titles.title_id 
    JOIN actors ON actors.id = actors_titles.actor_id 
    WHERE titles.title = '${movieTitle}'`

    pool((err, connection) => {
        connection.query(query, (err, result, fields) => {
            connection.release()

            if (err) throw err

            res.send(result)
        })
    })
})

app.get('/moviesbyactor/', (req, res) => {
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

app.listen(8081, () => {
    console.log('Lyssnar på 8081')
})

const mysql = require('mysql')
const pw = require('./pw.js')

let pool = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: pw.user,
    password: pw.password,
    database: 'moviedb',
})

let getConnection = function(callback) {
    pool.getConnection(function(err, connection) {
        callback(err, connection)
    })
}

module.exports = getConnection

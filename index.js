const express = require('express')

const app = express()

app.use(express.json())

const router = require('./router.js')

app.use('/', router)

app.listen(8081, () => {
    console.log('Lyssnar på 8081')
})

require('dotenv').config()
const express = require('express')
const massive = require('massive')
const {
    SERVER_PORT,
    CONNECTION_STRING
} = process.env

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('database is connected')
})
// req.get('db').user.getuser


const app = express()
app.use(express.json())


app.listen(SERVER_PORT, () => console.log(`Server is listening on ${SERVER_PORT}`))
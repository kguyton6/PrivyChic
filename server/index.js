require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const massive = require('massive')
const ctrl = require('./controller')
const CORS = require('cors')
const bcrypt = require('bcryptjs')

const {
  DATABASE_URL,
  SERVER_PORT
} = process.env



massive(DATABASE_URL).then(dbInstance => {
  app.set('db', dbInstance)
  console.log('database connected')
}).catch(err => console.log(err, 'connection error'))

app.use(bodyParser.json())
app.use(CORS())
app.use(session({
  secret: 'SESSION_SECRET',
  resave: false,
  saveUninitialized: false
}))


app.post('/auth/signup', async (req, res) => {
  const dbInstance = req.app.get('db')
  const {username, password} = req.body
  console.log(username, password)

  let user = await dbInstance.check_user(username)
  if(user[0]){ return res.status(401).send('Email already in use')
} else {

  let salt = bcrypt.genSaltSync(10)
   let hash = bcrypt.hashSync(password, salt)
   let newUser = await dbInstance.create_user(username, hash)
  
     req.session.user = newUser[0]
     console.log(req.session.user)

     res.status(200).send(newUser)
 }
})

app.post('/auth/login', async (req, res) => {
  const dbInstance = req.app.get('db')
  const {username, password} = req.body
  console.log(username, password)

  let user = await dbInstance.check_user(username)

  let result = await bcrypt.compareSync(password, user[0].password);
  console.log(result)
 if (result) {
    req.session.user = user[0]
    res.status(200).send('success')
      console.log(req.session.user)
      app.get('/api/getuser', (req, res) => {
        dbInstance.getuser(req.session.user.user_id)
        .then((user) => res.status(200).send(user))
      })
    } else {
    res.status(401).send('wrong password')
  }
})


app.get('/api/logout', ctrl.logout)
// app.get('/api/getuser', ctrl.getuser)


const PORT = process.env.SERVER_PORT || 4800

app.listen(PORT, () => console.log(`Server Is Listening on ${SERVER_PORT}`))
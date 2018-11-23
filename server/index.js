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
  SERVER_PORT,
  APP_ID,
  APP_CODE
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
  const {first_name, last_name, email, password} = req.body
  console.log(first_name, last_name, email, password)

  let user = await dbInstance.check_user(email)
  if(user[0]){ return res.status(401).send('Email already in use')
} else {

  let salt = bcrypt.genSaltSync(10)
   let hash = bcrypt.hashSync(password, salt)
   let newUser = await dbInstance.create_user(first_name, last_name, email, hash)
  
     req.session.user = newUser[0]
     console.log(req.session)

    }
    res.status(200).send(req.session.user)
})


app.get('/getuser', (req, res) => {
  const dbInstance = req.app.get('db')

  dbInstance.getuser(req.session.user.user_id)
  .then((user) => res.status(200).send(user))
})

app.post('/auth/login', async (req, res) => {
  const dbInstance = req.app.get('db')
  const {email, password} = req.body
  console.log(email, password)

  let user = await dbInstance.check_user(email)

  let result = await bcrypt.compareSync(password, user[0].password);
  console.log(result)
 if (result) {
    req.session.user = user[0]
    res.status(200).send('success')
      console.log(req.session)
      app.get('/api/getuser', (req, res) => {
        dbInstance.getuser(req.session.user.user_id)
        .then((user) => res.status(200).send(user))
      })
    } else {
    res.status(401).send('wrong password')
  }
})

app.get('/api/getuser', ctrl.getuser)
app.get('/api/logout', ctrl.logout)
app.get('/api/name/:id', ctrl.stylist_name)
app.get('/api/zip/:id', ctrl.stylist_zip)
app.get('/api/date/:id', ctrl.get_availablility)
app.get('/api/profile/:id', ctrl.getStylist)
app.get('/api/hours/:id', ctrl.get_hours)
app.get('/api/services/:id', ctrl.allServices)
app.post('/api/signup/business', ctrl.create_business)
app.post('/api/addProfile', ctrl.create_profile)
app.post('/auth/login/business', ctrl.business_login)


const PORT = SERVER_PORT || 4800

app.listen(PORT, () => console.log(`Server Is Listening on ${SERVER_PORT}`))
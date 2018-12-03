require('dotenv').config()
const path = require('path');
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const massive = require('massive')
const ctrl = require('./controller')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')


const {

  DATABASE_URL,
  SERVER_PORT,
  APP_ID,
  APP_CODE
} = process.env

app.use(express.static(`${__dirname}/../build`))



massive(DATABASE_URL).then(dbInstance => {
  app.set('db', dbInstance)
  console.log('database connected')
}).catch(err => console.log(err, 'connection error'))



app.use(bodyParser.json())


app.use(session({
  secret: 'SESSION_SECRET',
  resave: false,
  saveUninitialized: false
}))




// app.post('/emails', (req, res) => {
  
//   var data = {
//     from: `Kimberly Guyton ${EMAIL}`,
//     to: `kimguyton@gmail.com, ${EMAIL}`,
//     subject: 'Hello',
//     text: 'Testing some Mailgun awesomness!'
//   };
//   mailgun.messages().send(data, function (err, body) {
//     console.log(err, body, 'whats up');
//   })
// })


const stripe = require("stripe")("sk_test_WidQ87DFISivzhHHZIYyZX0p");
app.post('/save-stripe-token', async (req, res) => {
  let { email } = req.body
  let token = (req.body, 'tok_mastercard')

  const customer = await stripe.customers.create({
    source: token,
    email: email
    
  });
  res.json({ customer });
  
  res.status(500).end();
});

app.post('/auth/signup', async (req, res) => {
  const dbInstance = req.app.get('db')
  const { full_name, email, password } = req.body
  console.log(full_name, email, password)

  let user = await dbInstance.check_user(email)
  if (user[0]) {
    return res.status(401).send('Email already in use')
  } else {
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password, salt)
    let newUser = await dbInstance.create_user(full_name, email, hash, 'client')

    req.session.user = newUser[0]
    console.log(req.session)
    res.status(200).send(req.session.user)

  }
})

app.post('/auth/login', async (req, res) => {
  const dbInstance = req.app.get('db')
  const { email, password } = req.body
  console.log(email, password)

  let user = await dbInstance.check_user(email)

  let result = await bcrypt.compareSync(password, user[0].password);
  console.log(result)
  if (result) {
    if (user[0].user_type === 'client') {
    req.session.user = user[0]
      console.log(req.session.user)
      res.status(200).send(req.session.user)
      
    } else {
      console.log(user[0].user_id)
     let  businessUser = await dbInstance.loginbusiness(user[0].user_id)
      if(businessUser){
      req.session.user = businessUser[0]
      }
      console.log(req.session)
      res.status(200).send(req.session.user)
    }
  } else {
    res.status(401).send('wrong password')
  }
})

app.get('/checkSession', (req, res) => {
  if (req.session.user) {
    res.status(200).send(req.session.user)
  }
})

  app.post('/sendEmail', (req, res, next) => {
      const { stylist_name, full_name, month_name, day, time, email } = req.body
    
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'kimguyton@gmail.com',
          pass: 'Haley12112006@'
        },
      })
      const mailOptions = {
        from: `"Kim Guyton" <kimguyton@gmail.com>`,
        to: `${email}`,
        subject: `Appointment Confirmation from PrivyChic`,
        text: `${full_name}, Thank you for using PrivyChic, your appointment is scheduled with ${stylist_name} on ${month_name} ${day}, at ${time}.`,
         replyTo: `kimguyton@gmail.com`,
         html: '<b>From PrivyChic</b>'
      }
      console.log(mailOptions)
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error('there was an error: ', err);
        } else {
          console.log('Message Sent: %s ', info.response)
        }
      })
    })
  


  app.get('/api/getuser', ctrl.get_user)
  app.get('/api/logout', ctrl.logout)
  app.get('/api/name/:id', ctrl.stylist_name)
  app.get('/api/zipcode/:id', ctrl.stylist_zip)
  app.get('/api/date/:id', ctrl.get_availablility)
  app.get('/api/profile/:id', ctrl.getStylist)
  app.get('/api/calendar/:id', ctrl.get_calendar)
  app.get('/api/appointments/:id', ctrl.myAppointments)
  app.get('/api/services/:id', ctrl.allServices)
  app.get('/api/payments', ctrl.accept_payments)
  app.post('/auth/signup/business', ctrl.create_business)
  app.post('/auth/login/business', ctrl.business_login)
  app.post('/api/appointments/:id', ctrl.create_booking)
  app.delete('/api/delete/:id', ctrl.delete_user)
  app.delete('/api/delete/business/:id', ctrl.delete_business)
  app.delete('/api/delete/appointment/:id', ctrl.delete_appointment)
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
  });

  const PORT = SERVER_PORT || 9000

  app.listen(PORT, () => console.log(`Server Is Listening on ${SERVER_PORT}`))
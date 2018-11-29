var nodemailer = require('nodemailer');
const creds = require('../config/config');

module.exports = {
  USER: 'kimguyton@gmail.com', 
  PASS: 'Haley12112006@'
}

var transport = {
  host: 'smtp.gmail.com',
  auth: {
    user: creds.USER,
    pass: creds.PASS
  }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});


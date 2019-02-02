const nodemailer = require('nodemailer')


module.exports = {
    sendMail: (req, res) => {
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
        }
     )}
}
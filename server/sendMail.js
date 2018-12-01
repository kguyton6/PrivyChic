const express = require('express')
const sendMail = express.Router()
const emailUtil = require('./email-utils')

const {sendEmail} = emailUtil

sendMail.post('/mail', async (req, res) => {
    // const {recipient, messsage } = req.body
    try {
        await sendEmail('kimguyton@gmail.com', messsage);
        res.json({message: 'Your query has been sent'});
            await next();

    } catch (e) {
        await next(e)
    }
});


module.exports = sendMail
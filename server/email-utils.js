require('dotenv').config()
const emailConfig = require('./email-config')
const {API_PRIVATE_KEY, EMAIL, DOMAIN} = process.env
var mailgun = require('mailgun-js')({apiKey: API_PRIVATE_KEY, domain: DOMAIN},(emailConfig))


exports.sendEmail = (recipient, message, attachment) => new Promise((resolve, reject) => {


var data = {
	from: `Kimberly Guyton <k.guyton@gmail.com>`,
	to: recipient,
	subject: message.subject,
	text: message.text,
	inline: attachment, 
	html: message.html,
};
mailgun.messages().send(data, function (err, body) {
	if(err) {
		return reject(err, body)
	}
	return resolve()
})
})

    


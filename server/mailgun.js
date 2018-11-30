var mailgun = require("mailgun-js");
var DOMAIN = 'www.privychic.com'

const {API_KEY, EMAIL, HOST} = process.env
var mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});
var data = {
	from: `Kimberly Guyton ${HOST}`,
	to: `kimguyton@gmail.com, ${EMAIL}`,
	subject: 'Hello',
	text: 'Testing some Mailgun awesomness!'
};
mailgun.messages().send(data, function (error, body) {
	console.log(body);
});
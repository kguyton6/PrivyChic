require('dotenv').config()

const {API_PUBLIC_KEY, DOMAIN } = process.env

module.exports = () => {
    const emailConfig = {
        apiKey: 'a22c3a27d94c543f02f6553cca0b2b52-059e099e-27ee8096', 
        domain: 'sandbox863f26236dfb4d84b2339ccaa0a862b1.mailgun.org'
    }
    
    return emailConfig
};
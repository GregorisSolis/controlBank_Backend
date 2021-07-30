const path = require('path')
const nodemailer = require('nodemailer')

const config = require('../config.js')
const smtpTransport = require('nodemailer-smtp-transport')

const hbs = require('nodemailer-express-handlebars')

const transport = nodemailer.createTransport(smtpTransport({
  host: config.NODE_MAILER_HOST,
  port: config.NODE_MAILER_PORT,
  auth: { user: config.NODE_MAILER_USER, pass: config.NODE_MAILER_PASS }
}))


const handlebarOptions = {

  viewEngine: {
    extName: '.html',
    partialsDir: path.resolve('./src/resources/mail/auth/'),
    layoutsDir: path.resolve('./src/resources/mail/auth/'),
    defaultLayout: 'forgot_password.html',
  },
  viewPath: path.resolve('./src/resources/mail/auth/'),
  extName: '.html',
};


transport.use('compile', hbs(handlebarOptions));


module.exports = transport
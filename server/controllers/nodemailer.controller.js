const fs = require('fs')
const nodemailer = require('nodemailer')
var handlebars = require('handlebars');

const AUTHEMAIL = process.env.AUTHEMAIL
const AUTHPASS = process.env.AUTHPASS
const REGISTER_EMAIL = fs.readFileSync(__dirname + '/nodemailer-email/register.html', 'utf-8')

module.exports = {
  sendEmail: (req, res) => {
    let { name } = req.body
    let { purpose } = req.query
    let emailTemplate = ""
    let nameCapitalize = name.charAt(0).toUpperCase() + name.slice(1)

    if (purpose === 'register') {
      emailTemplate = REGISTER_EMAIL
    }

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: `${AUTHEMAIL}`,
        pass: `${AUTHPASS}`
      }
    });

    let template = handlebars.compile(emailTemplate);
    let data = { 'name': nameCapitalize }
    let templateWithData = template(data)

    // setup email data with unicode symbols
    let mailOptions = {
      from: `"Bookinesia" ${AUTHEMAIL}`,
      to: 'marco.sumali@yahoo.com',
      subject: `Welcome To Bookinesia, ${data.name}`, 
      html: `${templateWithData}`
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('ERROR:', error);
        res.status(200).json({
          message: 'ERROR: Message not sent',
          error
        })    
      } else {
        console.log(`Message sent (${purpose}): %s`, info.messageId);
        res.status(200).json({
          message: 'Message is sent',
          messageId: info.messageId
        })    
      }
    });

  }
}
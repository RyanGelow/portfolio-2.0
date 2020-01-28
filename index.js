const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const AUTH = require('./config');

// const cookieParser = require('cookie-parser');
// const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());


app.post('/api/form', (req, res) => {
  
  const auth = {
    auth: {
      api_key: AUTH.APIKEY,
      domain: AUTH.DOMAIN
    }
  }

  const nodemailerMailgun = nodemailer.createTransport(mg(auth))

  const htmlEmail = `
    <h3>Ryan Gelow Portfolio Outreach Email</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `

  nodemailerMailgun.sendMail({
    from: 'outreach@ryangelow.com',
    to: AUTH.USER, // An array if you have multiple recipients.
    // cc:'second@domain.com',
    // bcc:'secretagent@company.gov',
    subject: 'Ryan Gelow Portfolio Outreach',
    html: htmlEmail,
    text: req.body.message,
  }, (err, info) => {
    if (err) {
      console.log(`Error: ${err}`);
    }
    else {
      console.log(`Response: ${JSON.stringify(info)}`);
    }
  });
  
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
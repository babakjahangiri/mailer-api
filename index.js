const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
const PORT = process.env.PORT;

//bodyParse setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  const data = {
    message: 'please use the proper end point',
  };
  res.send(data).status(200);
});

app.post('/send', (req, res) => {
  if (req.body.api_key !== process.env.API_KEY) {
    res.send('validation failed !').status(200);
    return;
  }

  //console.log("Start sending an email ...")
  const transporter = nodemailer.createTransport({
    port: 465, // true for 465, false for other ports
    host: process.env.SMTP_HOST,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: process.env.SMTP_TO,
    subject: req.body.subject || process.env.SMTP_SUBJECT,
    html: req.body.message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      // console.log(error);
      res.status(500).json({
        success: false,
        error: error,
      });
    } else {
      //console.log('Email sent: ' + info.response);
      res.status(200).json({
        success: true,
        error: info.response,
      });
    }
  });
});

app.listen(PORT, () => console.log(`Mailer is running on port ${PORT}`));

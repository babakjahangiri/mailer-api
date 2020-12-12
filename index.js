const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()

const app = express();
app.use(cors());
const PORT = process.env.PORT;


//bodyParse setup
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get("/",(req,res)=> {
  const data = {
    "message" : "please use the proper end point"
  }
  res.send(data).status(200);
});


app.post("/send",(req,res)=> {


  if (req.body.apikey !== process.env.API_KEY){
  res.send("validation failed !").status(200);}

  console.log("Start sending an email ...")

  const transporter = nodemailer.createTransport({
    port: 587,               // true for 465, false for other ports
    host: process.env.SMTP_HOST,
    auth: {
      user:process.env.SMTP_USER,
      pass:process.env.SMTP_PASSWORD
    },
    secure: false,
  });

  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: process.env.SMTP_TO,
    subject: process.env.SMTP_SUBJECT,
    text: req.body.message
  };

  transporter.sendMail(mailOptions,(error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});

app.listen(PORT, () =>
  console.log(`Mailer is running on port ${PORT}`)
);


const express = require('express');
const Router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User model
const User = require('../../models/User');
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
//Post Router api/users/reset-password

Router.post('/sendquotation',(req,res)=>{

         const quotation = 50000;
      const message= `
        <h1>Quotation: </h1>
        <p>${quotation}</p>
        `
      try {const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth : {
            user: 'quotationsystem6@gmail.com',
            pass: 'Awsd@12345'
        }
    })
    
    const mailOptions = {
        from :'quotationsystem6@gmail.com',
        to: 'rpate629@my.centennialcollege.ca',
        subject : "Quotation Request Confirmation",
        html : message
    }

    transporter.sendMail(mailOptions,function (err,info) {
        if (err) {
            console.log(err);
        }else{
            console.log(info);
        }
    })
        
        res.status(200).json({success:true ,data:"Email Sent"})
      } catch (error) {
    
        return("Email could not be sent")
  
      }
    });
  
  




module.exports = Router;
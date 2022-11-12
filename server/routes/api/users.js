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

Router.post('/forgotpassword', (req, res) => {

    const email = req.body.email;

    try {
        User.findOne({
            email: email
        }).then(user => {
            //Check if Your Exists
            if (!user) {
                return res.status(404).json({
                    emailNotFound: "Email is not registered"

                });
            }
            const resetToken = user.email;
            const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`

            const message = `
        <h1>You have requested a password reset</h1>
        <p>Please go to this link to reset your password</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
       
        `
            try {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'quotationsystem6@gmail.com',
                        pass: 'Awsd@12345'
                    }
                })

                const mailOptions = {
                    from: 'quotationsystem6@gmail.com',
                    to: email,
                    subject: "Password Reset Request",
                    html: message
                }

                transporter.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(info);
                    }
                })

                res.status(200).json({ success: true, data: "Email Sent" })
            } catch (error) {
                user.resetPasswordToken = undefined
                user.resetPasswordExpire = undefined
                return next(new ErrorResponse("Email could not be send", 500))

            }
        });


    } catch (error) {
        next()
    }
})

//Post Router api/users/new-password

Router.put('/passwordreset/:resetToken', (req, res) => {
    const restToken = req.params.resetToken;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            try {
                User.findOne({
                    email: restToken
                }).then(user => {

                    if (!user) {
                        return next(new ErrorResponse("Invalid Reset Token", 400))
                    }

                    const newUser = new User({
                        name: user.name,
                        email: restToken,
                        role: user.usertype,
                        password: hash,
                    })

                    User.findByIdAndUpdate(user._id, {
                        password: hash
                    }, (error, data) => {
                        if (error) {
                            return next(error);
                            console.log(error)
                        } else {
                            res.json(data)
                            console.log('User updated successfully !')
                        }
                    })
                });

            } catch (error) {
                console.log(error)
            }



        });
    });
})


//Post Router api/users/register
Router.post('/register', (req, res) => {
    //Form Validation
    //Destructuring Values
    const {
        errors,
        isValid
    } = validateRegisterInput(req.body);

    //Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (user) {
                return res.status(400).json({
                    email: "Email already exists"
                });
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    usertype: req.body.usertype,
                    phonenumber: req.body.phonenumber,
                    password: req.body.password

                });

                //Hash password before saving in database
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user)

                            )
                            .catch(err => console.log(err));
                    });
                });
            }
        });
});
//Post Router api/users/login

Router.post('/login', (req, res) => {
    //Login Validation
    const {
        errors,
        isValid
    } = validateLoginInput(req.body);

    //Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    //Find User By Email
    User.findOne({
        email: email
    }).then(user => {
        //Check if Your Exists
        if (!user) {
            return res.status(404).json({
                emailNotFound: "Email is not registered"
            });
        }

        //Match Password
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (isMatch) {
                    //User Matched
                   
                    //Create JWT Payload
                    const payload = {
                        id: user.id,
                        name: user.name,
                        role: user.usertype,
                        email: user.email
                    };
                   
                    //Sign Token
                    jwt.sign(payload, config.get('secretOrKey'), {
                        expiresIn: 63113852 //2 years in seconds  
                    }, (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer" + token
                        });
                    });
                } else {
                    return res.status(400).json({
                        passwordIncorrect: "Password incorrect"
                    });
                }
            });
    });
});

module.exports = Router;
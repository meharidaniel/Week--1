const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const auth = require('../middlewares/authorization'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');


router.post('/signup', (req, res, next) => {
    Users.find({email: req.body.email}).exec().then( User => {
        if(User) {
            res.status(409).json({
                message: 'mail exists '
            })
        } else {
            bcrypt.hash(req.body.password, 10, (error, hash) => {
                if(error) {
                    return res.status(500).json({
                        error: error
                    });
                }else {
                    const user = new Users({
                        email: req.body.email,
                        password: hash
                    });
                    user
                    .save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'user created'
                        });
                    })
                    .catch( error => {
                        console.log(error);
                        res.status(500).json({
                            error: error
                        })
                    })
                }
            });
        }
    }) 
});

router.post('/signin',(req, res, next) => {
    User
    .find({email: req.body.email})
    .exec()
    .then(users => {
        if(user.length < 1) {
            return res.status(401).json({
                message:'un Authorized'
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (error, result) => {
            if(error) {
                return res.status(401).json({
                    message:'unAuthorized'
                });
            }
            if(result) {
                const token = jwt.sign({
                    email: user[0].email, 
                    userId: user[0]._id
                }, 
                config.get('privateKey'),
                {
                    expiresIn: "1h"
                }
                );
                return res.status(200).json({
                    message: 'Authorization is successful!',
                    token: token
                });
            }
            res.status(401).json({
                message:'unAuthorized'
            });
        })
    })
    .catch( error => {
        console.log(error);
        res.status(500).json({
            error: error
        });
    });
});


router.delete('/:usersId', (req, res, next) => {
    Users.remove({_id: req.params.userId}).exec().then(result => {
        res.status(200).json({
            message: 'email deleted'
        });
    }).catch( error => {
        console.log(error);
        res.status(500).json({
            error: error
        })
    })
});



module.exports = router;
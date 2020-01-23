const {User, validateUserAuth} = require('../models/user');
const bcrypt = require('bcrypt');
const express = require('express');
const _ = require('lodash');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validateUserAuth(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    //console.log('finding user', user);
    if (!user) return res.status(400).send('Invalid email or password');

   // console.log(req.body.password);
   // console.log(user.password);

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    //console.log('validated user', validPassword);
    if (!validPassword) {
        return res.status(400).send('Invalid email or password');
    }

    const token = user.generateAuthToken();
    res.send(token);
});

module.exports = router;
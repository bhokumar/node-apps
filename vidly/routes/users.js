const {User, validate} = require('../models/user');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const express = require('express');
const _ = require('lodash');
const router = express.Router();

router.get('/me', auth, async (request, response, next) => {
    console.log(request.user);
    const user = await User.findById(request.user._id).select("-password");
    response.send(user);
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('User Already registered...')

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    user = await user.save();
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['name', 'email']));
});

module.exports = router;
const path = require('path');
const mongoose = require('mongoose');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById("5eaa035752fcb629248be3a6")
        .then(user => {
            req.user = user
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

const mongoUri = "mongodb+srv://user1:H07a3BFRwntZ9GrW@cluster0-8slms.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(mongoUri)
    .then(result => {
        // const user = new User({
        //     name: "Bhoopendra",
        //     email: 'bhoopendra.akgec@gmail.com',
        //     cart: {
        //         items: []
        //     }
        // });
        // user.save()
        console.log(result, "Connected");
        app.listen(3000, () => {
            console.log('App server started');
        });
    })
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressHandleBars = require('express-handlebars');


const app = express();


app.engine('handlebars', expressHandleBars({
    layoutsDir: 'views/layouts/',
    defaultLayout: 'main-layout'
}));

// Enable to Use EJS templates
//app.set('view engine', 'handlebars');

app.set('view engine', 'ejs')
app.set('views', 'views');

/*
// Enable this to use pug as Template Engine
app.set('view engine', 'pug');
*/

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorHandler = require('./controllers/errors');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorHandler.get404);

app.listen(3000);
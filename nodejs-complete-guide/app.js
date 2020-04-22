const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressHandleBars = require('express-handlebars');


const app = express();


app.engine('handlebars', expressHandleBars({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout'}));

app.set('view engine', 'handlebars');

app.set('views', 'views');

/*
// Enable this to use pug as Template Engine
app.set('view engine', 'pug');
*/

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.render('404', {
        pageTitle: 'Page not found'
    });
});

app.listen(3000);
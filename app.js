const path = require('path');
const express = require('express');
const expressHbs = require('express-handlebars');
const app = express();
const { get404Page } = require('./controllers/error')

// app.engine('hbs', expressHbs({ layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs' }));
// app.set('view engine', 'hbs');
// app.set('view engine', 'pug');

app.set('view engine', 'ejs')
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData);
app.use(shopRoutes);

app.use(get404Page);

app.listen(3000);

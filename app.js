const path = require('path');
const express = require('express');
const expressHbs = require('express-handlebars');
const app = express();
const { get404Page } = require('./controllers/error')
const sequelize = require('./util/database')
const Product = require('./models/product')
const User = require('./models/user')

// app.engine('hbs', expressHbs({ layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs' }));
// app.set('view engine', 'hbs');
// app.set('view engine', 'pug');

app.set('view engine', 'ejs')
app.set('views', 'views');

//adding comment from new COMP upgrade fixing comment from VS CODE

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData);
app.use(shopRoutes);

app.use(get404Page);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
// User.hasMany(Product)

sequelize
  .sync({ force: true })
  .then(result => {
    console.log(result)
  }).catch(err => console.log(err))

app.listen(3000);

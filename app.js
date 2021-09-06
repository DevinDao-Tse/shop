const express = require('express')
const app = express()
const adminRoute = require('./routes/admin')
const shopRoute = require('./routes/shops')
const path = require('path')

//setting HTML templatte engine to pug
//setting views for template
app.set('view engine', 'pug')
app.set('views', 'views')


//middlewares, routes, packages
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/admin', adminRoute.routes)
app.use(shopRoute)



//handling 404 error
app.use((req, res, next) => {
  res.status(404).render('404', { docTitle: '404' })
})

app.listen(3000, () => {
  console.log(`Listening on PORT 3000`)
})

const express = require('express')
const app = express()
const adminRoute = require('./routes/admin')
const shopRoute = require('./routes/shops')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/admin', adminRoute)
app.use(shopRoute)


app.get('/', (req, res, next) => {
  console.log(`2nd middleware`)
  res.send(`<h1>Hello from express</h1>`)
})

//handling 404 error
app.use((req, res, next) => {
  res.status(404).send('<h1>Page not found</h1>')
})

app.listen(3000, () => {
  console.log(`Listening on PORT 3000`)
})

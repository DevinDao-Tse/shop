const express = require('express')
const path = require('path')
const router = express.Router()
const rootDir = require('../utils/path')
const adminData = require('./admin')


router.get('/', (req, res, next) => {
  console.log(adminData.products)
  const products = adminData.products
  res.render('shop', { prods: products, docTitle: 'Shop' })
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'))
})



module.exports = router
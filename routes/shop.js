const path = require('path');
const express = require('express');
const rootDir = require('../util/path');

const router = express.Router();
const { getProducts, getIndex } = require('../controllers/shop')


router.get('/', getIndex);
router.get('/products', getProducts)
// router.get('/cart')
// router.get('/checkout')
// router.get('/index', )

module.exports = router;

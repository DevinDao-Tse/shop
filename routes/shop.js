const path = require('path');
const express = require('express');
const rootDir = require('../util/path');

const router = express.Router();
const { getProducts, getIndex, getCart, getCheckout, getOrders, } = require('../controllers/shop')


router.get('/', getIndex);
router.get('/products', getProducts)
router.get('/cart', getCart)
router.get('/checkout', getCheckout)
router.get('/orders', getOrders)


module.exports = router;

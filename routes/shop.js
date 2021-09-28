const path = require('path');
const express = require('express');
const rootDir = require('../util/path');

const router = express.Router();
const { getProducts, getIndex, getCart, getCheckout, getOrders, getProductID, addToCart, cartDeleteItem } = require('../controllers/shop')


router.get('/', getIndex);
router.get('/products', getProducts)
router.get('/products/:productID', getProductID)
router.get('/cart', getCart)
// router.post('/cart', addToCart)
router.post('/cart', addToCart)
router.post('/cart-delete-item', cartDeleteItem)
router.get('/checkout', getCheckout)
router.get('/orders', getOrders)


module.exports = router;

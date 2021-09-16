const path = require('path');
const express = require('express');

const router = express.Router();
const { getAddProduct, postAddProduct, editProduct, getProducts } = require('../controllers/admin')



router.get('/add-product', getAddProduct);

router.get('/products', getProducts)

// router.get('/edit-product', editProduct)

router.post('/add-product', postAddProduct);

module.exports = router;


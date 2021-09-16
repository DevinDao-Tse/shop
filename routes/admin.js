const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const router = express.Router();
const { getAddProduct, postAddProduct, editProduct, getAdminProduct } = require('../controllers/admin')


const products = [];


router.get('/add-product', getAddProduct);

router.get('/products', getAdminProduct)

router.get('/edit-product', editProduct)

router.post('/add-product', postAddProduct);

module.exports = router;


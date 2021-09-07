const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const router = express.Router();
const { getAddProduct, postAddProduct } = require('../controllers/products')


const products = [];

// /admin/add-product => GET
router.get('/add-product', getAddProduct);

// /admin/add-product => POST
router.post('/add-product', postAddProduct);

module.exports = router;


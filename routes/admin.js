const path = require('path');
const express = require('express');

const router = express.Router();
const { getAddProduct, postAddProduct, getProducts, getEditProduct, updateProduct, deleteProduct } = require('../controllers/admin')



router.get('/add-product', getAddProduct);

router.get('/products', getProducts)

router.post('/add-product', postAddProduct);

router.get('/edit-product/:productID', getEditProduct)

router.post('/edit-product', updateProduct)

router.post('/delete-product', deleteProduct)


module.exports = router;


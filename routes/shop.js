const path = require('path');
const express = require('express');
const rootDir = require('../util/path');

const router = express.Router();
const { getProducts } = require('../controllers/products')


router.get('/', getProducts);
// router.get('/index', )

module.exports = router;

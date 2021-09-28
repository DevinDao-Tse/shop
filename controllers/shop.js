const Product = require('../models/product')
const Cart = require('../models/cart')


exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'Shop',
      path: '/products'
    });
  })
}

exports.getProductID = (req, res, next) => {
  const { productID } = req.params
  Product.findById(productID, product => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    })
  })
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
    });
  })
}

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  })
}

exports.addToCart = (req, res, next) => {
  const { productID } = req.body
  Product.findById(productID, product => {
    // console.log(product)
    Cart.addProduct(productID, product.price)
  })
  res.redirect('/cart')
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Checkout'
  })
}

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = []
      for (product of products) {
        cartProductData = cart.products.find(prod => prod.id === product.id)
        if (cart.products.find(prod => prod.id === product.id)) {
          cartProducts.push({ productData: product, qty: cartProductData.qty })
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      })
    })
  })
}

exports.cartDeleteItem = (req, res, next) => {
  const { productID } = req.body
  Product.findById(productID, product => {
    Cart.deleteProduct(productID, product.price)
    res.redirect('/cart')
  })
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  })
}

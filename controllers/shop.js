const Product = require('../models/product')
const Cart = require('../models/cart')


exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/index', {
        prods: rows,
        pageTitle: 'Shop',
        path: '/',
      });
    }).catch(err => console.log(err))
}

exports.getProductID = (req, res, next) => {
  const { productID } = req.params
  // Product.findAll({
  //   where: { id: productID }
  // })
  //   .then(product => {
  //     res.render('shop/product-detail', {
  //       product: product[0],
  //       pageTitle: product[0].title,
  //       path: '/products'
  //     })
  //   })
  //   .catch(err => console.log(err))
  Product.findByPk(productID).then((product) =>
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    })
  ).catch(err => console.log(err))
}

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
      });
    }).catch(err => console.log(err))
}

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  })
}

exports.addToCart = (req, res, next) => {
  const { productID } = req.body
  Product.findByPk(productID, product => {
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
  Product.findByPk(productID, product => {
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

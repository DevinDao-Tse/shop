const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  })
}
exports.postAddProduct = (req, res, next) => {
  const item = req.body;
  const { title, imageUrl, price, description } = item
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  }).then(result => {
    console.log(result)
    res.redirect('/admin/products')
  }).catch(err => console.log(err))

}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if (!editMode) return res.redirect('/')

  const { productID } = req.params
  Product.findByPk(productID)
    .then(product => {
      if (!product) return res.redirect('/')

      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      })
    })
    .catch(err => console.log(err))
}

exports.updateProduct = (req, res, next) => {
  const { productID, title, imageUrl, price, description } = req.body
  const updatedProduct = new Product(productID, title, imageUrl, description, price)
  Product.findByPk(productID)
    .then(product => {
      product.title = title
      product.imageUrl = imageUrl
      product.price = price
      product.description = description
      return product.save()
    })
    .then(result => {
      console.log(result)
      res.redirect('/admin/products')
    })
    .catch(err => console.log(err))

}

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products',
      });
    }).catch(err => console.log(err))
}

exports.deleteProduct = (req, res, next) => {
  const { productID } = req.body
  Product.findByPk(productID)
    .then(product => product.destroy())
    .then(result => {
      console.log(result)
      res.redirect('/admin/products')
    })
    .catch(err => console.log(err))
  // Product.deleteById(productID)

}


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
  const { title, imageURL, price, description } = item
  const product = new Product(null, title, imageURL, description, price)
  product.save()
  res.redirect('/');
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if (!editMode) return res.redirect('/')

  const { productID } = req.params
  Product.findById(productID, product => {
    if (!product) return res.redirect('/')

    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    })
  })
}

exports.updateProduct = (req, res, next) => {
  const { productID, title, imageUrl, price, description } = req.body
  const updatedProduct = new Product(productID, title, imageUrl, description, price)
  updatedProduct.save()
  res.redirect('/admin/products')
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
    });
  })
}

exports.deleteProduct = (req, res, next) => {
  const { productID } = req.body
  Product.deleteById(productID)
  res.redirect('/admin/products')

}


const fs = require('fs')
const e = require('express')
const path = require('path')
const Cart = require('./cart')
const p = path.join(path.dirname(require.main.filename),
  'data',
  'products.json'
)
const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) return cb([])

    cb(JSON.parse(fileContent))
  })
}


module.exports = class Product {
  constructor(id, title, imageURL, description, price) {
    this.id = id
    this.title = title
    this.imageURL = imageURL
    this.description = description
    this.price = price
  }

  save() {
    getProductsFromFile(products => {
      if (this.id) {
        const existingProductIndex = products.findIndex(prod => prod.id === this.id)
        // console.log(existingProductIndex) 
        const updatedProduct = [...products]
        console.log(updatedProduct)
        updatedProduct[existingProductIndex] = this
        fs.writeFile(p, JSON.stringify(updatedProduct), err => {
          console.log(err)
        })
      } else {
        this.id = Math.random().toString()
        products.push(this)
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err)
        })
      }

    })
  }

  static deleteById(id) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id)
      const updatedProduct = products.filter(prod => prod.id !== id)
      // const productIndex = products.findIndex(prod => prod.id === id)
      fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
        console.log(err)
        if (!err) {
          Cart.deleteProduct(id, product.price)
        }
      })
    })
  }

  static fetchAll(cb) {
    getProductsFromFile(cb)
    // return products
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id)
      cb(product)
    })

  }
}
const express = require('express')
const { getProductsCart, addProductCart, updateCart, deleteProductCart } = require('../dao/controlers/CartController')

const CartRouter = express.Router()


CartRouter.get('/productCart', getProductsCart)
CartRouter.post('/addProductCart', addProductCart)
CartRouter.put('/productCart/:pid', updateCart)
CartRouter.delete('/productCart/:pid', deleteProductCart)

module.exports = CartRouter
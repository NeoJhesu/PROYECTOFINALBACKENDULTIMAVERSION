const mongoose = require ('mongoose')


const  Product =  mongoose.model(
    'product', {
        nombre: String,
        precio: Number,
        stock: Number,
        descripcion: String,
        imagen: String,   
        carrito: {type: Boolean, default:false}
    }
)

module.exports = Product
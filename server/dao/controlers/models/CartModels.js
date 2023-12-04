const mongoose = require ('mongoose')

const  CartSchema = new mongoose.Schema  (
    {
        nombre: { type: String, require:true, unique:true},
        precio: {type: Number, require:true },
        cantidad: {type: Number, require:true },
        imagen: {type: String,require:true }   
    }
)

const Carrito = mongoose.model('carrito', CartSchema)

module.exports = Carrito
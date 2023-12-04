const mongoose = require('mongoose')


const userSChema = new mongoose.Schema(
    {
        nombre: { type: String, required: true,unique: true, trim: true },
        email: { type: String, required: true, unique: true, trim: true },
        contraseña: { type: String, required: true, trim: true },
    }, {timestamps:true}
)

const User = mongoose.model('user', userSChema)

module.exports = User
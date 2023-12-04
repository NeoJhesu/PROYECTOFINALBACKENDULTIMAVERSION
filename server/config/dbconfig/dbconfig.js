const express = require('express')
const mongoose = require('mongoose')


// MongoDB/ MONGOOSE CONFIG
const CONNECTION_STRING = process.env.CONNECTION_STRING


mongoose.connect(CONNECTION_STRING + `productos_utn_noche`, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
const database = mongoose.connection;

database.on('error', () =>{
    console.log('Error al conectarse a MongoDB')
})//cuando este prendida la base de datos y tira algun error nos muestra por consola el error 
database.once('open', () =>{
    console.log('Conectado a MongoDB')
})// se activa una vez la vase de dato este abierta, y muestra por consola si esta concetado a la base de datos de mongo


module.exports = mongoose
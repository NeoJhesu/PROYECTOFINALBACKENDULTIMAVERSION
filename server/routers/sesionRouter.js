const express = require('express')
const { login, registro, logout, errorUsuario} = require ("../dao/controlers/userController");
const { validarUsuario } = require('../Utils/validarUsuarios');
const sesionRouter= express.Router()




sesionRouter.post('/registro', registro)
sesionRouter.post('/login', login)
sesionRouter.post('/logout', logout)
sesionRouter.get('/error', validarUsuario, errorUsuario )


module.exports = sesionRouter
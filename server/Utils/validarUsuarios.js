const express = require('express');
const jwt = require ('jsonwebtoken');
const TOKEN_SECRET = require('./tokenSecret');


const validarUsuario = (req, res, next) =>{
const {token} = req.cookies
if (!token) {
    return res.status(401).json({mensaje: 'No estas autorizado'})
} 
jwt.verify(token, TOKEN_SECRET, (err,user)=>{
    if (err) {
        return res.status(403).json({mensaje:'Token invalido'})
    } else {
        req.user = user  
    }
    next()
})
}


module.exports = {validarUsuario} 
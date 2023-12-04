const express = require('express');
const jwt = require('jsonwebtoken');
const TOKEN_SECRET = require('./tokenSecret');


const crearTokenDeAcceso = (payload)=>{
    return  new Promise ((resolve, reject)=>{
        jwt.sign(payload, 
            TOKEN_SECRET,
            {expiresIn:'1h'},
            (err, token)=>{
                if (err) {
                    console.log(err);
                }else{
                    resolve(token)
                }
            }
            )
    })
}


module.exports = crearTokenDeAcceso
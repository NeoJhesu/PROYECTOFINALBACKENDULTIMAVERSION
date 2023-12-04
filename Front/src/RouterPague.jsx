import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Detail, Home, CrearProducto, Login, Registro, Cartpage } from './screens'

const RouterPague = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/product/detail/:pid" element={<Detail />} />
        <Route path="/product/crearproducto" element={<CrearProducto/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/Registro" element={<Registro/>} />
        <Route path="/CartPage" element={<Cartpage/>}/>
    </Routes>
  )
}

export default RouterPague
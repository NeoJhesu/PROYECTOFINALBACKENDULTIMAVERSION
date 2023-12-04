import React from 'react'
import { NavLink } from 'react-router-dom'


const ProductCard = ({ product }) => {
  return (
    <>
      <NavLink to={`/product/detail/${product._id}`}>
        <div key={product._id} className='contenedorPductos'>
          {product.imagen && <img src={`http://localhost:3040/img/${product.imagen}`} />}
          <h3>{product.nombre}</h3>
          <span>$ {product.precio}</span>
        </div>
      </NavLink >
    </>
  )
}

export default ProductCard
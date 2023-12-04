import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./home.css"
import { Footer, NavBar, ProductCard } from '../../Componetes'


const Home = () => {
  const [buscar, setBuscar] = useState("")
  const [buscarElementos, setBuscarElementos] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch('http://localhost:3040/api/products',
      { method: 'GET' }
    )
      .then((res) => res.json())
      .then(result => {
        setProducts(result.products)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    setBuscarElementos(products.filter(producto => producto.nombre.toLowerCase().includes(buscar.toLowerCase())));
  }, [buscar, products]);

  return (
    <div>
      <NavBar onSearch={setBuscar} />
<div className='centrar'>
{
  loading ? 
  <h2 className='centrarvacia'>Cargando...</h2>
  :
  <div className='catalogo'>
    {
      buscarElementos.map(product => (
        <ProductCard product={product} key={product._id} />
      ))
    }
  </div>
}
</div>
      <div className='creacion'>
        <Link to={'/product/crearproducto'}>Crear Producto</Link>
      </div>
      <Footer />
    </div>
  )
}

export default Home
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Footer, NavBar } from '../../Componetes';
import './Detail.css'
const Detail = () => {
  const navigate = useNavigate();
  const { pid } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const [isEditModeActive, setIsEditModeActive] = useState(false);
  const [stockValue, setStockValue] = useState();
  const [cantidad, setCantidad] = useState(1);
  const updateProduct = () => {
    Swal.fire(
      '',
      'El producto se Actualizo con exito!',
      'success'
    )
  }
  const deleteProduct = () => {
    Swal.fire(
      '',
      'Produto elimindado!',
      'success'
    )
  }




  useEffect(() => {
    fetch(`http://localhost:3040/api/product/${pid}`)
      .then((res) => res.json())
      .then((result) => {
        setProductDetail(result.product);
      });
  }, []);

  const handleDeleteProduct = () => {
    fetch(`http://localhost:3040/api/product/${pid}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          navigate('/');
          deleteProduct();
        } else {
          alert('No se pudo eliminar el producto, intente más tarde');
        }
      });
  };

  const handleActiveEditMode = () => {
    setIsEditModeActive(true);
    setStockValue(productDetail.stock);
  };

  const handleConfirmNewStock = () => {
    fetch(`http://localhost:3040/api/product/${pid}?stock=${stockValue}`, { method: 'PUT' })
      .then((res) => res.json())
      .then((result) => {
        if (result.ok) {
          setProductDetail(result.product);
          updateProduct();
          navigate(`/`);
        } else {
          alert(result.error);
        }
      });
  };

  const handleAddToCart = () => {
    const { nombre, imagen, precio, stock } = productDetail;

    if (cantidad > stock) {
      alert('La cantidad ingresada excede el stock disponible');
      return;
    }

    fetch('http://localhost:3040/addProductCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, imagen, precio, cantidad }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.mensaje === 'El producto fue agregado al carrito') {
          alert('Producto agregado al carrito');
        } else {
          alert(data.mensaje);
        }
      });
  };

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className='megacontenedor'>

        {productDetail ? (

          <div>
            <div className='contenedor'>
              <div className='nombre'>
                <h2>{productDetail.nombre}</h2>
              </div>
              <div className='Producto'>
                {productDetail.imagen && <img src={`http://localhost:3040/img/${productDetail.imagen}`} />}
                <h3>Precio: ${productDetail.precio}</h3>
              </div>
              <div className='descripcion'>
                <p>{productDetail.descripcion}</p>
                <div className='stock'>
                  <span>
                    Stock:
                    {isEditModeActive ? (
                      <input
                        value={stockValue}
                        onChange={(e) => {
                          { if (e.target.value < 1) { e.target.value = 1 } setStockValue(e.target.value) }
                        }}
                        type="number"
                      />
                    ) : (
                      productDetail.stock
                    )}
                  </span>
                  <div className='botones'>
                    <button className='botonVariable' onClick={() => setCantidad(cantidad > 1 ? cantidad - 1 : 1)}>
                      -
                    </button>
                    <span>{cantidad}</span>
                    <button className='botonVariable'
                      onClick={() => setCantidad(cantidad === productDetail.stock ? cantidad : cantidad + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button className='botonCompra' onClick={handleAddToCart}>Agregar al carrito</button>

              </div>
            </div>
            <div className='Producto'>
              <button className='botonCompra' onClick={handleDeleteProduct}>Eliminar</button>
              {isEditModeActive ? (
                <button className='botonCompra' onClick={handleConfirmNewStock} >Confirmar</button>
              ) : (
                <button className='botonCompra' onClick={handleActiveEditMode}>Modificar Stock</button>
              )}
            </div>

          </div>
        ) : (
          <h2>Cargando...</h2>
        )}
      </div>

      <Footer />

    </>
  );
};

export default Detail;
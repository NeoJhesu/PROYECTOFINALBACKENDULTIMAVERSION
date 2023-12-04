import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import "./navbar.css"

const NavBar = ({ onSearch }) => {
  const [buscar, setBuscar] = useState("")
  const [user, setUser] = useState(null);

  useEffect(() => {
    const usernameCookie = document.cookie.split('; ').find(row => row && row.startsWith('username'));
    if (usernameCookie) {
      const username = usernameCookie.split('=')[1];
      if (username) {
        setUser(username);
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
        const response = await fetch('http://localhost:3040/logout', {
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Error al cerrar la sesión');
        }

        console.log('Sesión cerrada con éxito');
        setUser(null); // Borrar el usuario del estado
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Borrar el usuario de las cookies
    } catch (error) {
        console.error(error);
    }
};

  return (
    <>
      <div className='navbar'>
        <div className='info'>
          <NavLink to={"/"} >Inicio</NavLink>
          {user ? (
            <h3>{user}</h3> // Muestra el nombre del usuario
          ) : (
            <h3>Invitado</h3> // Muestra "Invitado" si no hay ningún usuario logueado
          )}
        </div>
        <input type="text" className='Buscador'
          placeholder='   Busqueda'
          value={buscar}
          onChange={(evento) => {
            setBuscar(evento.target.value);
            onSearch(evento.target.value)
          }} />

        <div className='info' >
            
        
            <>

            {user ? (
            <Link to="#" onClick={handleLogout}>Logout</Link> // Muestra el nombre del usuario
          ) : (
            <NavLink to={"/login"} >Acceso</NavLink>
          )}
            </>

          <NavLink to={"/CartPage"} >Carrito</NavLink>
        </div>
      </div>
    </>
  )
}

export default NavBar
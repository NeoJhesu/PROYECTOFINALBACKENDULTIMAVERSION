import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Footer, NavBar } from '../../Componetes';

const Login = () => {
    const navigate = useNavigate()
    const [nombre, setNombre] = useState('')
    const [contraseña, setContraseña] = useState('')


    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3040/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, contraseña }),
            });

            if (response.ok) {
                const user = await response.json();
                document.cookie = `username=${user.nombre}`;
                navigate('/')// Si la autenticación es exitosa, redirige al usuario a la página de inicio
            } else {
                const errorData = await response.json()
                console.error('Error de autenticación', errorData)
            }
        } catch (error) {
            console.error('Error de red', error)
        }
    };

    return (
        <>
            <NavBar />
            <div className='centrarPantalla'>
            <div className='creacion'>
                <div className='nuevoProducto'>
                    <form onSubmit={handleLogin}>
                        <div className='nuevoProducto'>
                            <label htmlFor="nombre">Ingrese Nombre</label>
                            <input
                                onChange={(e) => setNombre(e.target.value)}
                                type="text"
                                id="nombre"
                                name="nombre"
                                placeholder="Nombre de Usuario"
                                required
                            />

                            <label htmlFor="contraseña">Ingrese Contraseña</label>
                            <input
                                onChange={(e) => setContraseña(e.target.value)}
                                type="password"
                                id="contraseña"
                                name="contraseña"
                                placeholder="Contraseña de Usuario"
                                required
                            />
                        </div>
                        <input type="submit" value="Ingresar" />
                        <Link to={'/Registro'}><input type="submit" value="Registrar" /></Link>
                    </form>
                </div>
            </div>
            </div>
            <Footer />

        </>
    );
};

export default Login


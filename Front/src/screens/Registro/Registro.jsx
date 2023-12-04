import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer, NavBar } from '../../Componetes';

const Registro = () => {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [email, setemail] = useState('');
    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3040/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, contraseña, email}),
            });

            if (response.ok) {
                // Si la autenticación es exitosa, redirige al usuario a la página de inicio
                navigate('/login');
            } else {
                const errorData = await response.json();
                console.error('Error de autenticación:', errorData);
                // Puedes manejar el error, mostrar un mensaje de error, etc.
            }
        } catch (error) {
            console.error('Error de red:', error);
            // Puedes manejar el error de red, mostrar un mensaje de error, etc.
        }
    };

    return (
        <>
        <NavBar/>
        <div className='centrarPantalla'>
        <div className='creacion'>
        <div className='nuevoProducto'>
            <form onSubmit={handleLogin}>
            <div className='nuevoProducto'>
            <label htmlFor="email">Ingrese Correo</label>
                <input
                    onChange={(e) => setemail(e.target.value)}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Correo@correo.com"
                    required
                />

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
                <input type="submit" value="Enviar" />
            </form>
            </div>
        </div>
        </div>
        <Footer/>
        </>
    );
};

export default Registro
const User = require("../controlers/models/userModel")
const bcrypt = require('bcrypt')
const crearTokenDeAcceso = require("../../Utils/tokens")

//registro
const registro = async (req, res) => {
    const { nombre, contraseña, email } = req.body
    try {
        const hashedPassword = await bcrypt.hash(contraseña, 10)// encripta la contraseña
        const nuevoUsuario = new User({
            nombre,
            contraseña: hashedPassword,
            email
        })
        const usuarioGuardado = await nuevoUsuario.save()

        const token = await crearTokenDeAcceso({ id: usuarioGuardado._id })
        res.cookie('token', token);
        res.json({
            id: usuarioGuardado._id,
            nombre: usuarioGuardado.nombre,
            email: usuarioGuardado.email
        })
    }
    catch (error) {
        res.status(500).json({mensaje: 'error el usuario o coreo, ya estan en uso'})
    }
}



//login
const login = async (req, res) => {
    const { nombre, contraseña } = req.body;
    try {
        const usuarioBuscado = await User.findOne({nombre})
        if (!usuarioBuscado) {
            return res.status(400).json({mesaje: 'Usuario no encontrado'})
        } 

        const verificado = await bcrypt.compare(contraseña, usuarioBuscado.contraseña)//compara contraseñas 
        
        if (!verificado) {
            return res.status(400).json({mesaje: 'Credenciales Incorrectas'})
        }
        
        const token = await crearTokenDeAcceso({ id: usuarioBuscado._id })
        res.cookie('token', token);
        res.cookie('username', usuarioBuscado.nombre);
        res.json({
            id: usuarioBuscado._id,
            nombre: usuarioBuscado.nombre,
            email: usuarioBuscado.email
        })
    }
    catch (error) {
        res.status(500).json({mensaje: error.mensaje})
    }
}

//log out

const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    res.cookie('username', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
}

//rutas protegidas
const errorUsuario = async (req, res) => {
    const userFound = await User.findById(req.user)
    
if (!userFound) {
    return res.status(400).json({mesnaje: 'no se encontro al usuriario'})
} else {
        return res.json({
            id: userFound._id,
            nombre: userFound.nombre,
            email: userFound.email
        })
}
}

module.exports = { registro, login, logout, errorUsuario }
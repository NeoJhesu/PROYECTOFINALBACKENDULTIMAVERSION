const Carrito = require('./models/CartModels');
const Product = require('./models/productModels');

const getProductsCart = async (req, res) =>{
    const productCart = await Carrito.find();
    if (productCart) {
        res.send({productCart});
    } else {
        res.json({mensaje:'No hay Productos'})
    }
}


const addProductCart = async (req, res) => {
    const {nombre, imagen, precio, cantidad} = req.body
    const isInProducts = await Product.findOne({nombre})
    const emptyCart =  nombre !== "" && imagen !== "" && precio !== "";
    const isInCart = await Carrito.findOne({nombre});
    if (!isInProducts) {
        res.status(400).json({
            mensaje: 'El producto no se esta en la base de datos'
        })
    } else if (emptyCart && !isInCart) {
        const newProductInCart = new Carrito({nombre, imagen, precio, cantidad})
        await Product.findByIdAndUpdate(
            isInProducts?._id,
            {carrito: true, nombre, imagen, precio },
            {new: true}
        ).then((product)=>{
            newProductInCart.save()
            res.json({mensaje: 'El producto fue agregado al carrito', product})
        }).catch((error) => console.error(error))
    }
    else if (isInCart){
        res.status(400).json({mensaje:'El producto ya se encuenta en el carrito'})
    }
}
const updateCart = async (req, res)=> {
    const {pid} = req.params
    const {query} = req.query
    const body = req.body
    const productoBuscado = await Carrito.findById(pid)
    if (!query) {
        res.status(400).json({mensaje: 'Debes enviar una consulta'})
    } else if (productoBuscado && query === "add"){
        await Carrito.findByIdAndUpdate(pid, body, {new: true})
        .then((product)=> {
            res.json({mensaje: `El producto: ${product.nombre} fue actualizado`, product})
        })
    }
    else if(productoBuscado&& query ==="del"){
        await Carrito.findByIdAndUpdate(pid, body, {new: true})
        .then((product)=> {
            res.json({mensaje: `El producto: ${product.nombre} fue actualizado`, product})
        })
    }
    else {
        res.status(400).json({mensaje: 'Ocurrio un error'})
    }
}


const deleteProductCart = async (req, res)=>{
    const {pid} = req.params
    const ProductInCart = await Carrito.findById(pid)

    const {nombre, imagen, precio, _id} = await Product.findOne({
      nombre: ProductInCart.nombre
    })
    await Carrito.findByIdAndDelete(pid)
    await Product.findByIdAndUpdate(
      _id, 
      {inCart: false, nombre, imagen, precio},
      {new: true }
    ).then((product)=>{
      res.json({mensaje: `El producto: ${product.nombre} fue eliminado`, product})
    }).catch((error)=> res.json({mensaje: 'Ocurrio un error'}))

  }

module.exports = {getProductsCart, addProductCart, updateCart, deleteProductCart}
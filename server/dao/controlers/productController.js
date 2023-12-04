const Product = require('./models/productModels')


//funcion para crear productos 
const createProduct = async (product) => {
    const newProduct = new Product(product)
    try {
        return await newProduct.save()
    }
    catch (err) {
        console.error(err)
    }
}

const getProducts = async () => {
    return await Product.find({})
}


const deleteProduct = async (pid) => {
    try {
        const deleteProduct = await Product.findByIdAndRemove(pid)

        if (deleteProduct) {
            return { ok: true, deleteProduct }
        } else {
            return { error: 'Producto no encontrado' }
        }
    }
    catch (err) {
        return { error: 'id no valido' }
    }
}


const getProducById = async (pid) => {
    try {
        const buscarProducto = await Product.findById(pid)

        if (buscarProducto) {
            return { ok: true, product: buscarProducto }
        } else {
            return { error: 'Producto no encontrado' }
        }
    }
    catch (err) {
        return { error: 'id no valido' }
    }
}

const updatedByStock = async (pid, stock) => {
    try {
        const productUpdated = await Product.findByIdAndUpdate(pid, { stock: stock }, { new: true });
        if (productUpdated) {
            return { product: productUpdated };
        } else {
            return { error: 'Error al actualizar el producto' };
        }
    } catch (err) {
        return { error: 'No se pudo actualizar el producto' };
    }
};

module.exports = { createProduct, getProducts, deleteProduct, getProducById, updatedByStock }
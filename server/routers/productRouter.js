
const express = require('express')
const { createProduct, getProducts, deleteProduct, getProducById, updatedByStock} = require('../dao/controlers/productController')
const productRouter = express.Router()


productRouter.get('/', async (req, res)=>{
    res.json({ok: true, products: await getProducts()})
})

productRouter.post('/', async (req, res)=>{
    const {nombre, precio, stock, descripcion, imagen} = req.body
    const {img} = req.file;
    await createProduct ({nombre, precio, stock, descripcion, imagen, img})
    res.json({ok:true, products: await getProducts()})
})


productRouter.delete('/:pid', async (req, res)=>
{
    const {pid} = req.params
    let result = await deleteProduct(pid)
    if (result.ok) {
            return res.json(
                {
                    ok:true,
                    product: await getProducts(),
                    deleteProduct: result.deleteProduct
                }
            )
    } else {
        return res.status(404).json({ok: true, error: result.error})
    }
})

productRouter.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    let result = await getProducById(pid);
  
    if (result.product) {
      res.json({ ok: true, product: result.product });
    } else {
      res.status(404).json({ ok: false, error: result.error });
    }
  });
  

  productRouter.put('/:pid', async (req, res) => {
    const {pid} = req.params;
    const {stock} = req.query;
    let result = await updatedByStock (pid, stock)  
    if (result.product) {
      res.json({ ok: true, product: result.product });
    } else {
      res.status(404).json({ ok: false, error: result.error });
    }
  });



module.exports = productRouter
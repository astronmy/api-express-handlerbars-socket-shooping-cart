import express from 'express'
import ProductManager from '../managers/productManger.js';

const router = express.Router();

const productManager = new ProductManager('products.json');

router.get('/', (req, res) => {
    const products = productManager.getProducts();
    res.render('home', { title: 'Lista de Productos', products: products });
});
  
router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { title: 'Realtime Products' });
});

export default router;

import express from 'express';
import ProductManager from '../managers/productManger.js';

const router = express.Router();
const productManager = new ProductManager('products.json');

router.get('/', (request, response) => {
    try {
        const data = productManager.getProducts();
        response.status(200).json({ data });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

router.get('/:product_id', (request, response) => {
    const { product_id } = request.params;
    try {
        const product = productManager.getProductById(product_id);
        response.status(200).json({ product });
    } catch (error) {
        response.status(404).json({ error: error.message });
    }
});

router.post('/', (request, response) => {
    const productData = request.body;
    try {
        const newProduct = productManager.addProduct(productData);
        response.status(201).json({ message: 'Product created', product: newProduct });
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
});

router.put('/:product_id', (request, response) => {
    const { product_id } = request.params;
    const updates = request.body;
    try {
        productManager.updateProduct(Number(product_id), updates);
        response.status(204).json();
    } catch (error) {
        response.status(404).json({ error: error.message });
    }
});

router.delete('/:product_id', (request, response) => {
    const { product_id } = request.params;
    try {
        productManager.deleteProduct(product_id);
        response.status(200).json({ message: 'Product deleted'});
    } catch (error) {
        response.status(404).json({ error: error.message });
    }
});

export default router;

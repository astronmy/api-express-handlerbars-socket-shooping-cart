import express from 'express'
import CartManager from '../managers/cartManager.js';

const router = express.Router();
const cartManager = new CartManager('carts.json');


router.get('/:cart_id', (request, response) => {
    const { cart_id } = request.params;
    try {
        const data = cartManager.getCartById(cart_id);
        response.status(200).json({ data });
    } catch (error) {
        response.status(404).json({ error: error.message });
    }
});

router.post('/', (request, response) => {
    try {
        const cart = cartManager.createCart();
        response.status(201).json({ message: 'Cart created', ...cart });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

router.post('/:cart_id/product/:product_id', (request, response) => {
    const { cart_id, product_id } = request.params;
    try {

        const updated = cartManager.addProductToCart(cart_id, product_id);
        response.status(200).json({ message: 'Product added to cart', cart: updated });

    } catch (error) {
        response.status(404).json({ error: error.message });
    }
});

export default router;

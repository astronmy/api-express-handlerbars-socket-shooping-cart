import { existsSync, readFileSync, writeFileSync } from 'fs';

import path from 'path';

const basePath = 'src/data/';

export default class CartManager {
    constructor(fileName) {
        this.filePath = path.resolve(basePath, fileName);
        this.carts = [];

        if (existsSync(this.filePath)) {
            const fileContent = readFileSync(this.filePath, 'utf-8');
            this.carts = JSON.parse(fileContent);
        }
    }

    generateId() {
        return this.carts.length > 0
            ? Math.max(...this.carts.map(cart => cart.id)) + 1
            : 1;
    }

    createCart() {
        const newCart = {
            id: this.generateId(),
            products: []
        };

        this.carts.push(newCart);
        this.saveCarts();
        return newCart;
    }

    getCartById(cartId) {
        const cart = this.carts.find(cart => cart.id == cartId);

        if (!cart) {
            throw new Error(`Cart not found.`);
        }

        return cart.products;
    }

    addProductToCart(cartId, productId) {
        const cart = this.carts.find(cart => cart.id == cartId);
        if (!cart) {
            throw new Error(`Cart not found.`);
        }

        const existingProduct = cart.products.find(product => product.product == productId);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.products.push({
                product: productId,
                quantity: 1
            });
        }

        this.saveCarts();
        return cart;
    }

    saveCarts() {
        writeFileSync(this.filePath, JSON.stringify(this.carts, null, 2), 'utf-8');
    }
}

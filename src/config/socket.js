import { Server } from 'socket.io';

import ProductManager from '../managers/productManger.js';

const productManager = new ProductManager('products.json');

export const configureSocket = (server) => {
    const io = new Server(server);

    io.on('connection', (socket) => {
        console.log('Client connected ✅');

        socket.emit('updatedProducts', productManager.getProducts());

        socket.on('newProduct', (product) => {
            console.log(product);
            productManager.addProduct(product);
            io.emit('updatedProducts', productManager.getProducts());
        });

        socket.on('deleteProduct', (id) => {
            productManager.deleteProduct(id);
            io.emit('updatedProducts', productManager.getProducts());
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected ❌');
        });
    });

    return io;
};

import path from 'path';
import { existsSync, readFileSync, writeFileSync } from 'fs';

const basePath = 'src/data/';

export default class ProductManager {
  constructor(fileName) {
    this.filePath = path.resolve(basePath, fileName);
    this.products = [];

    // Load existing products from the file if it exists
    if (existsSync(this.filePath)) {
      const fileContent = readFileSync(this.filePath, 'utf-8');
      this.products = JSON.parse(fileContent);
    }
  }

  //make random id
  generateId() {
    return this.products.length > 0
      ? Math.max(...this.products.map(product => product.id)) + 1
      : 1;
  }

  // Add a new product
  addProduct({ title, description, code, price, status = true, stock, category, thumbnails }) {

    if (!title || !description || !code || !price || !stock || !category) {
      throw new Error('All fields: title, description, code, price, stock and category are required');
    }

    // Validate if code product already exists
    if (this.products.some(product => product.code === code)) {
      throw new Error(`Product with code "${code}" already exists.`);
    }

    const newProduct = {
      id: this.generateId(),
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails: thumbnails || []
    };

    this.products.push(newProduct);

    //save into file
    this.saveProducts();

    return newProduct;
  }

  // Get all products
  getProducts() {
    return this.products;
  }

  // Get a product by ID
  getProductById(id) {
    const product = this.products.find(product => product.id == id);

    console.log(this.products);
    if (!product) {
      throw new Error(`Product not found.`);
    }
    return product;
  }

  // Update a product by ID
  updateProduct(id, updates) {

    const productExists = this.products.some(product => product.id == id);

    if (!productExists) {
      throw new Error(`Product not found.`);
    }

    // search position
    const productIndex = this.products.findIndex(product => product.id == id);

    const updatedProduct = {
      ...this.products[productIndex],
      ...updates
    };

    this.products[productIndex] = updatedProduct;
    this.saveProducts();
    return updatedProduct;
  }


  deleteProduct(id) {
    const productExists = this.products.some(product => product.id == id);

    if (!productExists) {
      throw new Error(`Product not found.`);
    }

    const productIndex = this.products.findIndex(product => product.id == id);

    const deletedProduct = this.products.splice(productIndex, 1);

    this.saveProducts();

    return deletedProduct;
  }

  saveProducts() {
    writeFileSync(this.filePath, JSON.stringify(this.products, null, 2), 'utf-8');
  }
}
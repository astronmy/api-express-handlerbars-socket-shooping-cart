import express from 'express';
import handlebars from 'express-handlebars';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import cartRouter from './routes/carts.router.js';
import productRouter from './routes/products.router.js';
import productViewRouter from './routes/products-views.router.js';
import { configureSocket } from './config/socket.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const baseUrl = process.env.BASE_URL;


app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.get('/api/v1', (req, res) => {
  res.status(200).send('API is running');
});
app.use('/api/v1/carts', cartRouter);
app.use('/api/v1/products', productRouter);

// Frontend Routes
app.use('/', productViewRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const server = app.listen(port, () => {
  console.log(`Server is running on ${baseUrl}:${port}`);
});

configureSocket(server);

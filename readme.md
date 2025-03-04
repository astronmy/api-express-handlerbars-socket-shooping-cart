# API Shooping Cart with NodeJs,Express,Router para la Gestión de un Carrito de Compras

Este proyecto es una API REST construida con Node.js para gestionar un carrito de compras.
La API permite: 
- Realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre un conjunto de productos.
- Realizar operaciones CRU (Crear, Leer, Actualizar) sobre un carrito de compras.

## Descripción

Esta API proporciona las siguientes funcionalidades:

- **GET /products**: Obtener todas las productos.
- **POST /products**: Crear un nuevo producto.
- **PUT /products/:id**: Actualizar un producto existente.
- **DELETE /products/:id**: Eliminar un producto por ID.

- **GET /carts/:cart_id**: Obtener la información de un carrito por su ID.
- **POST /carts**: Crear un nuevo carrito vacío.
- **PUT /carts/:cart_id/product/:product_id**: Agregar un producto a un carrito seleccionado. Si el producto existe le suma su cantidad en 1

## Pre-requisitos

- Node.js y npm instalados en tu sistema.

## Instalación
El proyecto se encuentra dockerizado, para su instalación realice los siguientes pasos

Clona este repositorio en tu máquina local:

   ```bash
   docker build -t api-coderhouse .
   docker run -d --name api -p 3000:3000 api-coderhouse
   ```

## Probar la API con Postman

### Paso 1: Descargar la Colección de Postman

Para facilitar la prueba de la API, hemos creado una colección de Postman que contiene todas las solicitudes necesarias para interactuar con los endpoints de nuestra API. Puedes encontrar la colección en el archivo `Shooping Cart API Express.postman_collection.json` dentro del directorio `resources/` de este proyecto.

1. Dirígete a la carpeta `resources/` en este proyecto.
2. Descarga el archivo `Shooping Cart API Express.postman_collection.json`.

### Paso 2: Importar la Colección en Postman

1. Abre **Postman** en tu computadora. Si no lo tienes instalado, puedes [descargarlo aquí](https://www.postman.com/downloads/).
2. Haz clic en el botón **Import** en la parte superior izquierda de la aplicación Postman.
3. Selecciona la opción **Upload Files**.
4. Navega a la carpeta `resources/` donde descargaste el archivo `Shooping Cart API Express.postman_collection.json` y selecciona ese archivo.
5. Postman importará automáticamente la colección y la mostrará en el panel izquierdo.

### Paso 3: Usar la Colección en Postman

Una vez que la colección esté importada, podrás ver las siguientes solicitudes dentro de la colección:

### Products: api/v1/products

#### 1. **GET `/products`** - Obtener todos los productos

Esta solicitud te permite obtener todas las productos almacenadas en el servidor. Cuando la ejecutes, deberías recibir una respuesta con todos los productos.

**Ejemplo de Respuesta:**

```json
{
    "data": [
        {
            "id": "1",
            "title": "Laptop Gamer",
            "description": "Laptop de alto rendimiento para juegos, con procesador i7 y tarjeta gráfica RTX 3060.",
            "code": "LAPTOP123",
            "price": 1500,
            "status": true,
            "stock": 25,
            "category": "Electrónica",
            "thumbnails": [
                "https://picsum.photos/300?random=1",
                "https://picsum.photos/300?random=2"
            ]
        },
        {
            "id": "2",
            "title": "Smartphone",
            "description": "Teléfono inteligente con pantalla AMOLED y 128 GB de almacenamiento.",
            "code": "PHONE456",
            "price": 600,
            "status": true,
            "stock": 50,
            "category": "Electrónica",
            "thumbnails": [
                "https://picsum.photos/300?random=3",
                "https://picsum.photos/300?random=4"
            ]
        },
        {
            "id": "3",
            "title": "Zapatillas deportivas",
            "description": "Zapatillas cómodas y ligeras para correr.",
            "code": "SHOES789",
            "price": 80,
            "status": true,
            "stock": 100,
            "category": "Ropa y calzado",
            "thumbnails": [
                "https://picsum.photos/300?random=5",
                "https://picsum.photos/300?random=6"
            ]
        },
        {
            "id": "4",
            "title": "Auriculares Bluetooth",
            "description": "Auriculares inalámbricos con cancelación de ruido y batería de larga duración.",
            "code": "HEADSET321",
            "price": 120,
            "status": false,
            "stock": 0,
            "category": "Accesorios",
            "thumbnails": [
                "https://picsum.photos/300?random=7",
                "https://picsum.photos/300?random=8"
            ]
        },
        {
            "id": 5,
            "title": "Macbook Pro M4 Pro",
            "description": "Apple device",
            "code": "MACM411",
            "price": 1900,
            "status": true,
            "stock": 25,
            "category": "Electronics",
            "thumbnails": [
                "https://example.com/images/laptop1.jpg",
                "https://example.com/images/laptop2.jpg"
            ]
        }
    ]
}
```
#### 2.**GET `/products/:id`** - Obtener un producto específico

Este endpoint permite obtener un producto por su `id`.

**Solicitud:**

- **Método**: `GET`
- **URL**: `/products/:id` (Reemplaza `:id` con el `id` del producto que deseas obtener)

```json
{
    "product": {
        "id": "1",
        "title": "Laptop Gamer",
        "description": "Laptop de alto rendimiento para juegos, con procesador i7 y tarjeta gráfica RTX 3060.",
        "code": "LAPTOP123",
        "price": 1500,
        "status": true,
        "stock": 25,
        "category": "Electrónica",
        "thumbnails": [
            "https://picsum.photos/300?random=1",
            "https://picsum.photos/300?random=2"
        ]
    }
}
```

#### 3. **POST `/products`** - Crear Producto

**Solicitud:**

- **Método**: `POST`
- **URL**: `/products`
- **Cuerpo de la solicitud (JSON)**:

```json
{
  "title": "Macbook Pro M4 Pro",
  "description": "Apple device",
  "code": "MACM411",
  "price": 1900,
  "status": true,
  "stock": 25,
  "category": "Electronics",
  "thumbnails": [
    "https://example.com/images/laptop1.jpg",
    "https://example.com/images/laptop2.jpg"
  ]
}

```

#### 4. **PUT `/products/:id`** - Actualizar un producto total o parcialmente.

Dependiendo el cuerpo de la solicitud son los valores que se actualizarán

**Solicitud:**

- **Método**: `PUT`
- **URL**: `/products/:id`
- **Cuerpo de la solicitud (JSON)**:

```json
{
    "price": 1900
}
```

#### 5. **DELETE `/products/:id`** - Eliminar un Producto

Este endpoint permite eliminar un producto por su `id`. 

**Solicitud:**

- **Método**: `DELETE`
- **URL**: `/products/:id` 

**Respuestas:**

- **Código 200 - OK**: Si el producto se ha eliminado correctamente, recibirás una respuesta con un mensaje de éxito.

```json
{
    "message": "Product deleted",
}
```

### Carts: api/v1/carts

#### 1.**GET `/carts/:cart_id`** - Obtener un carrito específico

Este endpoint permite obtener un carrito por su `id`.

**Solicitud:**

- **Método**: `GET`
- **URL**: `/carts/:cart_id` 

```json
{
   {
    "data": [
        {
            "product": 101,
            "quantity": 2
        },
        {
            "product": 202,
            "quantity": 1
        }
    ]
  }
}
```

#### 2. **POST `/carts`** - Crear Carrito

**Solicitud:**

- **Método**: `POST`
- **URL**: `/carts`
- **Cuerpo de la solicitud (JSON)**:

```json
{
    "message": "Cart created",
    "id": 2,
    "products": []
}

```

#### 3. **PUT `/carts/:cart_id/product/product_id`** - Agregar Productos a un Carrito Existente


**Solicitud:**

- **Método**: `PUT`
- **URL**: `/carts/:cart_id/product/product_id`
- **Cuerpo de la solicitud (JSON)**:

const socket = io();

socket.on('updatedProducts', (products) => {
    const container = document.getElementById("products-container");
    container.innerHTML = "";

    products.forEach(product => {
        const thumbnailsHTML = product.thumbnails.map(image => {
            return ` <img src="${image}">`;
        });

        const productHTML = `
            <div class="product">
                <button class="delete-btn" onclick="deleteProduct('${product.id}')">X</button>
                <h3>${product.title}</h3>
                <p><strong>Description:</strong> ${product.description}</p>
                <p><strong>Price:</strong> $${product.price}</p>
                <p><strong>Category:</strong> ${product.category}</p>
                <p><strong>Stock:</strong> ${product.stock}</p>
                <div class="thumbnails">
                    ${thumbnailsHTML.join(" ")}
                </div>
            </div>
        `;
        container.innerHTML += productHTML;
    });
});

function addProduct() {
    const newProduct = {
        code: document.getElementById("code").value,
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        stock: document.getElementById("stock").value,
        category: document.getElementById("category").value,
        status: true, 
        thumbnails: [
            `https://picsum.photos/300?random=${(Math.floor(Math.random() * 2000) + 1)}`
        ]
    };

    document.querySelectorAll(`.form-input`).forEach(input => {
        input.value = '';
    });
    
    socket.emit("newProduct", newProduct);
    swal("Product has been save!", {
        icon: "success",
      });
}

function deleteProduct(id) {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          socket.emit('deleteProduct', parseInt(id));
          swal("Product has been deleted!", {
            icon: "success",
          });
        } 
      });
    
}

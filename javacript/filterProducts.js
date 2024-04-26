// Lista de productos a ser filtrada
const products = [
    { title: "iPad Pro 12.9", images: ["https://i.postimg.cc/kX8PKZpq/ipad.jpg"], description: "Silver", price: "900000", discount: "50% Off" },
    { title: "iPad Pro 12.9", images: ["https://i.postimg.cc/kX8PKZpq/ipad.jpg"], description: "Silver", price: "900000", discount: "50% Off" },
    { title: "iPad Pro 12.9", images: ["https://i.postimg.cc/kX8PKZpq/ipad.jpg"], description: "Silver", price: "900000", discount: "50% Off" },
    // Otros productos...
];

// Definición de la función captureText
function captureText(event) {
    // Obtener el valor del input
    const searchText = event.target.value.toLowerCase(); // Texto a minúsculas para filtrado insensible a mayúsculas/minúsculas

    console.log("Texto capturado:", searchText); // Para depuración

    // Filtrar productos por nombre
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchText) || 
        product.description.toLowerCase().includes(searchText)
    );

    // Imprimir tarjetas para productos filtrados
    printCards(filteredProducts, "products");
}

// Asignar el evento keyup al input de búsqueda
const searchSelector = document.querySelector("#search");
searchSelector.addEventListener("keyup", event => captureText(event));

// Función para imprimir tarjetas de producto
function printCards(arrayOfProducts, idSelector) {
    let productsTemplate = "";
    for (const product of arrayOfProducts) {
        productsTemplate += createCard(product); // Generar tarjetas para cada producto
    }
    const productsSelector = document.getElementById(idSelector);
    if (productsSelector) {
        productsSelector.innerHTML = productsTemplate; // Actualizar el contenido del DOM
    } else {
        console.error("Products selector not found");
    }
}

// Función para crear una tarjeta de producto
function createCard(product) {
    return `
        <a href="./details.html?id=${product.id}" class="product-card">
            <img class="product-img" src="${product.images[0]}" alt="${product.title}">
            <div class="product-info">
                <span class="product-title">${product.title}</span>
                <span class="product-description">${product.description}</span>
                <div class="product-price-block">
                    <span class="product-price">$${product.price}</span>
                    <span class="product-discount">${product.discount ? product.discount + '%' : ''}</span>
                </div>
            </div>
        </a>
    `;
}



// Obtener la query de la URL
const query = location.search;

// Crear un objeto URLSearchParams
const params = new URLSearchParams(query);

// Obtener el valor del parámetro 'id'
const id = params.get('id');

// Imprimir el id por consola
console.log("ID del producto:", id);

// Función para cambiar la imagen agrandada al hacer clic en una miniatura
function changeMini(event) {
    const selectedSrc = event.target.src; // Obtener la ruta de la imagen de la miniatura
    const bigSelector = document.querySelector("#bigImg"); // Seleccionar el ID de la imagen agrandada
    bigSelector.src = selectedSrc; // Actualizar la imagen agrandada
}

// Función para actualizar el subtotal
function changeSubtotal(event, productPrice) {
    const quantity = parseInt(event.target.value, 10); // Guardar la cantidad como número entero
    const subtotal = quantity * productPrice; // Calcular el subtotal

    const subtotalSelector = document.querySelector("#subtotal"); // Buscar la etiqueta del subtotal
    if (subtotalSelector) {
        subtotalSelector.innerText = `Subtotal: $${subtotal}`; // Actualizar la vista con el subtotal
    } else {
        console.error("Subtotal selector not found");
    }
}

// Modificación para incluir el input numérico y el evento onchange
function printDetails(product) {
    const productDetailSelector = document.getElementById("productDetail");

    if (productDetailSelector) {
        const productPrice = parseFloat(product.price); // Asegúrate de obtener el precio como número

        const productTemplate = `
            <div class="product-detail">
                <img id="bigImg" src="${product.images[0]}" alt="${product.title}" class="product-big-img">
                <div class="product-info">
                    <h2>${product.title}</h2>
                    <p>${product.description}</p>
                    <span class="product-price">$${product.price}</span>

                    <!-- Input para cantidad -->
                    <div class="product-quantity">
                        <label for="quantity">Cantidad:</label>
                        <input
                            type="number"
                            id="quantity"
                            value="1"
                            min="1"
                            max="100"
                            onchange="changeSubtotal(event, productPrice)" // Asignar el evento
                        />
                    </div>

                    <!-- Mostrar el subtotal inicial -->
                    <div id="subtotal">Subtotal: $${product.price}</div>
                </div>
            </div>
        `;

        productDetailSelector.innerHTML = productTemplate;
    } else {
        console.error("Product detail selector not found");
    }
}

// Función para actualizar el subtotal cuando se cambia la cantidad
function changeSubtotal(event, productPrice) {
    const quantity = parseInt(event.target.value, 10); // Obtener la cantidad como un número entero
    const subtotal = quantity * productPrice; // Calcular el subtotal

    // Seleccionar la etiqueta donde se muestra el subtotal
    const subtotalSelector = document.querySelector("#subtotal");

    if (subtotalSelector) {
        subtotalSelector.innerText = `Subtotal: $${subtotal}`; // Actualizar el texto del subtotal
    } else {
        console.error("Subtotal selector not found");
    }
}

/////////asasasas////




document.addEventListener('DOMContentLoaded', function() {
    // Precio del producto
    const priceElement = document.getElementById('price');
    const priceText = priceElement.textContent.replace(/[^\d]/g, ''); // Obtiene solo el número
    const price = parseFloat(priceText);

    // Campo de cantidad
    const quantityInput = document.querySelector('.checkout-process input[type="number"]');

    // Botón de añadir al carrito
    const addToCartButton = document.querySelector('.cart-btn');

    // Evento para calcular el subtotal
    addToCartButton.addEventListener('click', function() {
        const quantity = parseInt(quantityInput.value); // Cantidad de productos
        const subtotal = quantity * price; // Calcular subtotal
        
        // Mostrar el subtotal en un mensaje de alerta
        alert(`El subtotal es: $${subtotal}`);
    });

    // Cambiar imagen grande según las miniaturas
    const miniImages = document.querySelectorAll('.product-images img.mini-img');
    const bigImage = document.getElementById('big-img');

    miniImages.forEach(function(image) {
        image.addEventListener('click', function() {
            bigImage.src = image.src; // Cambia la imagen grande por la miniatura seleccionada
        });
    });
});
// Función para agregar productos al carrito
function addToCart(product) {
    // Obtener el carrito existente del Local Storage o crear uno nuevo
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Verificar si el producto ya está en el carrito
    const productIndex = cart.findIndex((item) => item.name === product.name);
  
    if (productIndex > -1) {
      // Si el producto ya está en el carrito, incrementar la cantidad
      cart[productIndex].quantity += 1;
    } else {
      // Si el producto no está en el carrito, agregarlo
      cart.push({ name: product.name, price: product.price, quantity: 1 });
    }
  
    // Guardar el carrito actualizado en Local Storage
    localStorage.setItem("cart", JSON.stringify(cart));
  
    // Calcular el total del carrito
    let total = 0;
    for (const item of cart) {
      total += item.price * item.quantity;
    }
  
    console.log("Producto añadido al carrito:", product);
    console.log("Total a pagar:", total);
  }
  
  // Obtener el botón y agregar el evento de clic
  const addToCartButton = -document.getElementById("addToCartButton");
  
  addToCartButton.addEventListener("click", () => {
    // Crear un objeto para el producto
    const product = {
      name: "Matcha Latte",
      price: 15.0,
    };
  
    // Llamar a la función para agregar al carrito
    addToCart(product);
  });
  
  
  
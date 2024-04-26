const navSelector = document.getElementById("header-container");

const options = [
    { title: "Ofertas de la semana", linkTo: "./outlet.html" },
    { title: "", linkTo: "./how.html" },
    { title: "", linkTo: "./taxs.html" },
    { title: "", linkTo: "./orders.html" },
    { title: "", linkTo: "./warranty.html" },
    { opts: ["Laptops", "Audio", "Auticulares"] },
    { opts: ["Formas de pago", "", ""] },
    { opts: ["Impuestos", ""] },
    { opts: ["", ""] },
    { opts: [] },
  ];

  for (let option of options) {
    const anchor = document.createElement("a");
    anchor.className = "nav-button"
    anchor.textContent = option.title
    anchor.href = option.linkTo
    navbarSelector.appendChild(anchor)
  }

  const footerSelector = document.querySelector("#footer");


  const productsSelector = document.getElementById("products");
  let productsTemplate = "";
  for (const element of products) {
    productsTemplate = productsTemplate + createCard(element)
  }
function createCard(product) {
    return `
       <a href="/details.html" class="product-card">
          <img class="product-img" src="${product.images[0]}" alt="${product.id}">
          <div class="product-info">
             <span class="product-title">${product.title}</span>
       ...
    `;
 }
 function printCards(arrayOfProducts, idSelector) {
    let productsTemplate = "";
    for (const element of arrayOfProducts) {
      productsTemplate = productsTemplate + createCard(element);
    }
    const productsSelector = document.getElementById(idSelector);
    productsSelector.innerHTML = productsTemplate;
  }
  printCards(products, "products");

  
let shoppingList = [];
let totalAmount = 0;

// Función para cargar productos desde la API
function loadProducts() {
  fetch("http://localhost:3000/api/products")  
    .then(response => response.json()) 
    .then(products => {
      // Aquí actualizamos las columnas con los productos desde la API
      const leftColumn = document.querySelector(".left-column");
      const rightColumn = document.querySelector(".right-column");

      leftColumn.innerHTML = '';
      rightColumn.innerHTML = '';

      // Añadir los productos a las columnas de izquierda y derecha
      products.forEach((product, index) => {
        const productItem = `
          <div class="product-item" onclick="addProduct('${product.name}', ${product.price})">
            <img src="image/${product.name.toLowerCase().replace(" ", "_")}.jpg" alt="${product.name}">
            <p>${product.name}</p>
          </div>
        `;
        if (index < 5) {
          leftColumn.innerHTML += productItem;
        } else {
          rightColumn.innerHTML += productItem;
        }
      });
    })
    .catch(error => console.error('Error al cargar los productos:', error));
}

// Cargar los productos cuando la página se cargue
window.onload = loadProducts;

// Función para agregar productos a la lista de compras
function addProduct(name, price) {
  const existingProduct = shoppingList.find(item => item.name === name);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    shoppingList.push({ name, quantity: 1, price });
  }

  updateList();
  updateTotal();
}

// Función para actualizar la lista de compras en la interfaz
function updateList() {
  const tableBody = document.querySelector("#shoppingList tbody");
  tableBody.innerHTML = "";

  shoppingList.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>${(item.price * item.quantity).toFixed(2)}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Función para actualizar el total a pagar
function updateTotal() {
  totalAmount = shoppingList.reduce((total, item) => total + item.price * item.quantity, 0);
  document.getElementById("totalAmount").innerText = totalAmount.toFixed(2);
}

// Función para reiniciar la lista de compras
function resetList() {
  shoppingList = [];
  updateList();
  updateTotal();
}

// Función para proceder al pago (aquí con ticker de progreso)
function pay() {
  // Mostramos la barra de progreso
  document.getElementById("progressWrapper").style.display = "block";
  document.getElementById("progressBar").style.width = "0%"; // Reiniciamos la barra
  document.getElementById("progressText").innerText = "Procesando pago..."; // Texto de la barra

  // Simulamos el proceso de pago con un intervalo
  let progress = 0;
  let interval = setInterval(function() {
    progress += 10; // Incrementamos el progreso
    document.getElementById("progressBar").style.width = progress + "%"; // Actualizamos la barra

    // Cuando la barra llega al 100%, actualizamos el texto
    if (progress === 100) {
      clearInterval(interval); // Detenemos el intervalo
      document.getElementById("progressText").innerText = "Pago completado"; // Texto de completado

      // Reiniciar lista después del pago
      setTimeout(resetList, 1000); // Esperamos 1 segundo antes de reiniciar
    }
  }, 500); // Aumentamos el progreso cada 500 ms
}

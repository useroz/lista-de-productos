// Requiere express
const express = require('express');

// Crea una instancia de Express
const app = express();

// Habilita JSON como formato de intercambio de datos
app.use(express.json());

// Lista de productos (simulación de base de datos)
const products = [
  { id: 1, name: "manzana roja", price: 10 },
  { id: 2, name: "sandia", price: 15 },
  { id: 3, name: "lechuga", price: 5 },
  { id: 4, name: "plátano", price: 8 },
  { id: 5, name: "tomate", price: 12 },
  { id: 6, name: "zanahoria", price: 6 },
  { id: 7, name: "pera", price: 7 },
  { id: 8, name: "uva", price: 20 },
  { id: 9, name: "mango", price: 18 },
  { id: 10, name: "naranja", price: 9 }
];

// Ruta para obtener todos los productos
app.get('/api/products', (req, res) => {
  res.json(products); // Devuelve la lista de productos como respuesta JSON
});

// Configuración del puerto en el que el servidor escuchará
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

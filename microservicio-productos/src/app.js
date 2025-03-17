const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Configuración de MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect();

// Endpoint para obtener todos los productos
app.get('/productos', (req, res) => {
  connection.query('SELECT * FROM productos', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Endpoint para crear un producto
app.post('/productos', express.json(), (req, res) => {
  const { nombre, descripcion, precio, stock } = req.body;
  connection.query(
    'INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)',
    [nombre, descripcion, precio, stock],
    (error, results) => {
      if (error) throw error;
      res.json({ id: results.insertId, nombre, descripcion, precio, stock });
    }
  );
});

app.listen(port, () => {
  console.log(`Microservicio de Productos escuchando en http://localhost:${port}`);
});
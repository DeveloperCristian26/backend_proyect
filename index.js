require('dotenv').config();

const express = require('express');
const conectarDB = require('./config/db');
const router = require('./routes/nota'); // Importar las rutas de notas

const app = express();

conectarDB(); // Conectar a la base de datos MongoDB

const port = 3000;

app.use(express.json()); // Middleware para parsear JSON    

app.use('/api', router); // Usar las rutas de notas en el prefijo /api

app.get('/', (req, res) => {
    res.send('Hello, World!');
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}   );
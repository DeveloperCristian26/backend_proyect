const express = require('express');
const router = express.Router();
const NotaControllers = require('../controllers/NotaControllers');

router.post('/nota', NotaControllers.crearNota);
router.get('/notas', NotaControllers.obtenerNotas);
router.get('/notas/:id', NotaControllers.obtenerNotaPorId);
router.put('/notas/:id', NotaControllers.actualizarNota);

module.exports = router;
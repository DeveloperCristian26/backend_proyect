const express = require('express');
const router = express.Router();
const NotaControllers = require('../controllers/NotaControllers');
const auth = require('../middleware/auth')

router.post('/nota', auth, NotaControllers.crearNota);
router.get('/notas', auth, NotaControllers.obtenerNotas);
router.get('/notas/:id', auth, NotaControllers.obtenerNotaPorId);
router.put('/notas/:id', auth, NotaControllers.actualizarNota);
router.delete('/notas/:id', auth, NotaControllers.eliminarNota);

module.exports = router;
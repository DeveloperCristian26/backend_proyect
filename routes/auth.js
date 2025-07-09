const express = require('express')
const router = express.router();
const authControllers= require('../controllers/authControllers')

router.post('/registrar', authControllers.registrarUsuario);
router.post('/login', authControllers.autenticarUsuario);

module.exports=router;
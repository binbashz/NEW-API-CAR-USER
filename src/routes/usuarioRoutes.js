const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/registro', usuarioController.registrarUsuario);
router.post('/inicio-sesion', usuarioController.iniciarSesion);

module.exports = router;
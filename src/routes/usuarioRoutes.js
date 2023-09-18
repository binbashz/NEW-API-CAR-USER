const express = require('express');
const router = express.Router();

// Controladores relacionados con usuarios
const { registrarUsuario, iniciarSesion, cerrarSesion } = require('../controllers/usuarioController');

// Ruta para registrar un nuevo usuario
router.post('/registro', registrarUsuario);

// Ruta para iniciar sesión
router.post('/inicio-sesion', iniciarSesion);

// Ruta para cerrar sesión
router.get('/cerrar-sesion', cerrarSesion);

module.exports = router;

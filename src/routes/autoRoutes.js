const express = require('express');
const router = express.Router();

// Importa el controlador de autos
const autoController = require('../controllers/autoController');

// Ruta para registrar un nuevo auto
router.post('/registrar', autoController.registrarAuto);

// Otras rutas relacionadas con autos
router.get('/', autoController.obtenerAutos); // Obtener la lista de autos
router.put('/:id', autoController.actualizarAuto); // Actualizar un auto
router.delete('/:id', autoController.eliminarAuto); // Eliminar un auto

module.exports = router;

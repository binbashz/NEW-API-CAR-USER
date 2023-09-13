
const express = require('express');
const router = express.Router();
const autoController = require('../controllers/autoController');

router.post('/registro', autoController.registrarAuto);

module.exports = router;
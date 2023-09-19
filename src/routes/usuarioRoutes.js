const express = require('express');
const router = express.Router();

// Controladores relacionados con usuarios
const { registrarUsuario, iniciarSesion, cerrarSesion } = require('../controllers/usuarioController');

// Middleware para verificar la sesión del usuario
const verificarSesion = (req, res, next) => {
    if (req.session.userId) {
        // El usuario está autenticado, continúa con la solicitud
        next();
    } else {
        // El usuario no está autenticado, redirige a la página de inicio de sesión
        res.redirect('/login.html');
    }
};

// Ruta para registrar un nuevo usuario
router.post('/registro', registrarUsuario);

// Ruta para iniciar sesión
router.post('/inicio-sesion', iniciarSesion);

// Ruta para cerrar sesión
router.get('/cerrar-sesion', cerrarSesion);

/* Rutas para perfiles de usuario, solo accesibles si el usuario está autenticado
router.get('/perfil.html', verificarSesion, (req, res) => {
    // Aquí manejas la lógica para mostrar la página de perfil enviando un archivo HTML
    res.sendFile(__dirname + '/public/html/perfil.html'); // Ejemplo de envío de archivo HTML
}); */

// Rutas para perfiles de usuario, solo accesibles si el usuario está autenticado
router.get('/perfil', verificarSesion, (req, res) => {
    // Asegúrate de proporcionar la variable 'user' al renderizar la plantilla 'perfil.ejs'
    res.render('perfil', { user: req.user }); // 'req.user' debe contener la información del usuario autenticado
});

module.exports = router;

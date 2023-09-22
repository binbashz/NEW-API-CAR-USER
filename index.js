const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const usuarioControllers = require('./src/controllers/usuarioController');
const autoRoutes = require('./src/routes/autoRoutes');

const mysql = require('mysql2/promise');  // Asegúrate de tener instalada la dependencia mysql2
const bcrypt = require('bcrypt'); // requiere modulo de encriptacion******************* 
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Configuración de la base de datos
const dbConfig = {
  host: 'localhost',
  user: 'root',
  database: 'rendatabase',
  password: ''
};

// Configura el motor de vistas EJS y la carpeta de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configura el middleware body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/usuarios', usuarioRoutes);
app.use('/autos', autoRoutes);
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'tu_secreto_secreto',
    resave: false,
    saveUninitialized: true
  })
);

// Función para crear una conexión a la base de datos
async function createDBConnection() {
  const connection = await mysql.createConnection(dbConfig);
  return connection;
}

// Rutas
app.post('/registro', usuarioControllers.registrarUsuario);
app.post('/inicio-sesion', usuarioControllers.iniciarSesion);
app.get('/cerrar-sesion', usuarioControllers.cerrarSesion);


// Rutas inicio
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/html/index.html');
});

// Ruta para mostrar el formulario de inicio de sesión  // esta otra ruta 
app.get('/login.html', (req, res) => {
  res.sendFile(__dirname + '/public/html/login.html');
});

// Ruta registro
app.get('/registro.html', (req, res) => {
  res.sendFile(__dirname + '/public/html/registro.html');
});

/* Ruta para el perfil esta es la nueva en la cerpta view renderizada NUEVA RUTAAAAAAAAA RENDERIZADA
app.get('/perfil', (req, res) => {
  res.render('perfil'); // Renderiza el archivo perfil.ejs desde la carpeta 'views'
}); */

// Ruta para el perfil
app.get('/perfil', (req, res) => {
  // Asegúrate de tener la variable 'user' definida o reemplaza con tu lógica de autenticación
  const user = req.user; // Esto es solo un ejemplo, debes usar tu propia lógica

  // Renderizamos el archivo perfil.ejs desde la carpeta 'views' y pasamos la variable 'user'
  res.render('perfil', { user });
});

// Ruta para mostrar el perfil de usuario
app.get('/perfil', async (req, res) => {
  // Verificar si el usuario está autenticado
  if (!req.session.userId) {
    return res.redirect('/login.html');
  }

  try {
    // Obtener información del usuario por su ID
    const connection = await createDBConnection();
    const usuario = await obtenerInformacionDelUsuario(connection, req.session.userId);
    connection.end();

    if (usuario) {
      // Renderizar la plantilla EJS "perfil.ejs" y pasar los datos del usuario
      res.render('perfil', { usuario });
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (error) {
    console.error('Error al obtener información del usuario:', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

// Ruta para el estilo de página
app.use('/public/css', express.static(__dirname + '/public/css', {
  setHeaders: (res, path, stat) => {
    res.set('Content-Type', 'text/css');
  },
}));

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});

// Función para obtener información del usuario desde la base de datos
async function obtenerInformacionDelUsuario(connection, userId) {
  try {
    // Obtener información del usuario por su ID
    const [userData] = await connection.execute('SELECT * FROM usuarios WHERE id = ?', [userId]);

    if (userData.length === 0) {
      // El usuario no existe
      return null;
    }

    const usuario = userData[0];

    return usuario;
  } catch (error) {
    console.error('Error al obtener información del usuario:', error);
    throw error;
  }
}

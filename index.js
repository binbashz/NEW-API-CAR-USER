const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session'); // Importa express-session
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const autoRoutes = require('./src/routes/autoRoutes');
const mysql = require('mysql2/promise'); // Importa el módulo MySQL2
const bcrypt = require('bcrypt'); // Importa bcrypt para el hashing de contraseñas

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/usuarios', usuarioRoutes);
app.use('/autos', autoRoutes);
app.use(express.static(__dirname + '/public')); // para servir los archivos estáticos

// Configura la sesión de Express
app.use(session({
  secret: 'tu_secreto_secreto', // Cambia esto a una cadena secreta más segura
  resave: false,
  saveUninitialized: true
}));

// Rutas inicio
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/html/index.html'); 
});

// Ruta registro
app.get('/registro.html', (req, res) => {  // muestra la pagina html registro
  res.sendFile(__dirname + '/public/html/registro.html');
});

// Ruta para registrar un nuevo usuario
app.post('/registro', async (req, res) => { // procesamiento de los datos enviados a través del formulario de registro
  const { nombre, email, contrasena } = req.body;

  try {
    // Conectarse a la base de datos
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'rendatabase',
      password: ''
    });

    // Verificar si el usuario ya existe en la base de datos
    const [existingUser] = await connection.execute('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (existingUser.length > 0) {
      // El usuario ya existe
      return res.status(400).json({ mensaje: 'El usuario ya existe' });
    }

    // Hash de la contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Insertar el nuevo usuario en la base de datos
    await connection.execute('INSERT INTO usuarios (nombre, email, contrasena) VALUES (?, ?, ?)', [
      nombre,
      email,
      hashedPassword
    ]);

    // Cerrar la conexión a la base de datos
    await connection.end();

    // Responder con un mensaje de éxito
    return res.status(201).json({ mensaje: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

// Ruta para mostrar el formulario de inicio de sesión
app.get('/login.html', (req, res) => {
  res.sendFile(__dirname + '/public/html/login.html');
});

// Ruta para acceder a el perfil de usuario
app.get('/perfil.html', (req, res) => {
  res.sendFile(__dirname + '/public/html/perfil.html');
});

// Ruta para procesar el inicio de sesión
app.post('/inicio-sesion', async (req, res) => {
  const { email, contrasena } = req.body;

  try {
    // Conectarse a la base de datos
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'rendatabase',
      password: ''
    });

    // Buscar el usuario en la base de datos por su correo electrónico
    const [user] = await connection.execute('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (user.length === 0) {
      // El usuario no existe
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Verificar la contraseña utilizando bcrypt
    const passwordMatch = await bcrypt.compare(contrasena, user[0].contrasena);

    if (!passwordMatch) {
      // La contraseña es incorrecta
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Almacenar información del usuario en la sesión
    req.session.userId = user[0].id;
    req.session.userEmail = user[0].email;

    // Inicio de sesión exitoso
    return res.status(200).json({ mensaje: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

// Ruta para cerrar sesión
app.get('/cerrar-sesion', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar la sesión:', err);
    }
    res.redirect('/');
  });
});


// Ruta para el estilo de pagina 
app.use('/public/css', express.static(__dirname + '/public/css', { 
  setHeaders: (res, path, stat) => {
    res.set('Content-Type', 'text/css');
  },
}));

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});

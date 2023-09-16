const express = require('express');
const bodyParser = require('body-parser');
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const autoRoutes = require('./src/routes/autoRoutes');
const mysql = require('mysql2/promise'); // Importa el módulo MySQL2
const bcrypt = require('bcrypt'); // Importa bcrypt para el hashing de contraseñas

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Rutas inicio
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/html/index.html'); 
});

// Rutas relacionadas con usuarios
app.use('/usuarios', usuarioRoutes);

// Rutas relacionadas con autos
app.use('/autos', autoRoutes);

// Ruta para registrar un nuevo usuario
app.post('/registro', async (req, res) => {
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

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});

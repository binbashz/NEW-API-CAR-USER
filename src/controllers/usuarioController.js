/* Un controlador es una parte de una aplicación web que se encarga de manejar las solicitudes del cliente y
 coordinar la lógica de la aplicación. 
Manejar solicitudes HTTP: Los controladores reciben solicitudes HTTP, como solicitudes GET, POST, PUT o DELETE,
 y determinan cómo debe responder la aplicación a esas solicitudes.
Procesan los datos, interactúan con la base de datos, realizan cálculos y toman decisiones en función de la
 solicitud del cliente.

controladores relacionados en este archivo 
controladores de registro y controlador  para iniciar sesión de un usuario */

const mysql = require('mysql2');
const bcrypt = require('bcrypt');

// Configura la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'rendatabase',
  password: ''
});

// Controlador para registrar un nuevo usuario
exports.registrarUsuario = async (req, res) => {
  const { nombre, email, contrasena } = req.body;

  try {
    // Verificar si el usuario ya existe en la base de datos
    const [existingUser] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (existingUser.length > 0) {
      return res.status(400).json({ mensaje: 'El usuario ya existe' });
    }

    // Hash de la contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Insertar el nuevo usuario en la base de datos
    await db.execute('INSERT INTO usuarios (nombre, email, contrasena) VALUES (?, ?, ?)', [
      nombre,
      email,
      hashedPassword
    ]);

    // Responder con un mensaje de éxito
    res.status(201).json({ mensaje: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Controlador para iniciar sesión de un usuario
exports.iniciarSesion = async (req, res) => {
  const { email, contrasena } = req.body;

  try {
    // Buscar el usuario en la base de datos
    const [user] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (user.length === 0) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Verificar la contraseña usando bcrypt
    const passwordMatch = await bcrypt.compare(contrasena, user[0].contrasena);

    if (!passwordMatch) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Usuario válido
    res.status(200).json({ mensaje: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Controlador para cerrar sesión
exports.cerrarSesion = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar la sesión:', err);
    }
    res.redirect('/');
  });
};

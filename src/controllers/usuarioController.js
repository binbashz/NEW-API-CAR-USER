// implementar las funciones para registrar usuarios e iniciar sesión
// asegúrarse de haber configurado previamente la base de datos y las tablas según los pasos anteriores
// las funciones de controladores  para registrar usuario en la base de datos MySQL.


const mysql = require('mysql2');

// Configura la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'rent_agile', // Nombre de la base de datos
});

// Función para registrar un nuevo usuario
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

// Función para iniciar sesión de un usuario
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

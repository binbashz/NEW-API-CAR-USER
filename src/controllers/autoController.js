// asegúrarse de haber configurado previamente la base de datos y las tablas según los pasos anteriores
// las funciones de controladores  para registrar y autos en la base de datos MySQL.

const mysql = require('mysql2');

// Configura la conexión a la base de datos MySQL (si aún no está configurada)
const db = mysql.createConnection({
  host: 'localhost',
      user: 'root',
      database: 'rendatabase',
      password: ''
});

// Función para registrar un nuevo auto
exports.registrarAuto = (req, res) => {
  const { marca, modelo, matricula, precioPorDia, disponible } = req.body;

  // Inserta el nuevo auto en la base de datos
  db.query(
    'INSERT INTO autos (marca, modelo, matricula, precioPorDia, disponible) VALUES (?, ?, ?, ?, ?)',
    [marca, modelo, matricula, precioPorDia, disponible],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ mensaje: 'Error al registrar el auto' });
      } else {
        res.status(201).json({ mensaje: 'Auto registrado exitosamente' });
      }
    }
  );
};

// autoController.js

const mysql = require('mysql2');

// Conexión a la base de datos MySQL
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

// Función para obtener la lista de autos
exports.obtenerAutos = (req, res) => {
  // Realiza una consulta SQL para obtener la lista de autos desde la base de datos
  db.query('SELECT * FROM autos', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ mensaje: 'Error al obtener la lista de autos' });
    } else {
      res.status(200).json({ autos: results });
    }
  });
};

// Función para actualizar un auto por su ID
exports.actualizarAuto = (req, res) => {
  const autoId = req.params.id;
  const { marca, modelo, matricula, precioPorDia, disponible } = req.body;

  // Actualiza el auto en la base de datos utilizando su ID
  db.query(
    'UPDATE autos SET marca=?, modelo=?, matricula=?, precioPorDia=?, disponible=? WHERE id=?',
    [marca, modelo, matricula, precioPorDia, disponible, autoId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ mensaje: 'Error al actualizar el auto' });
      } else {
        res.status(200).json({ mensaje: 'Auto actualizado exitosamente' });
      }
    }
  );
};

// Función para eliminar un auto por su ID
exports.eliminarAuto = (req, res) => {
  const autoId = req.params.id;

  // Elimina el auto de la base de datos utilizando su ID
  db.query('DELETE FROM autos WHERE id=?', [autoId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ mensaje: 'Error al eliminar el auto' });
    } else {
      res.status(200).json({ mensaje: 'Auto eliminado exitosamente' });
    }
  });
};



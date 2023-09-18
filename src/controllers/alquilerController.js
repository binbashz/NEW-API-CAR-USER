// alquilerController.js

// Controlador para procesar el alquiler de un automóvil
exports.alquilarAuto = async (req, res) => {
    const { autoId, fechaInicio, fechaFinal } = req.body;
  
    try {
      // Aquí debes calcular el costo del alquiler en función de la tarifa diaria y la duración en días
      // Puedes utilizar la fórmula que mencioné en una respuesta anterior o cualquier otra lógica que prefieras.
  
      // Después de calcular el costo, puedes almacenar los detalles del alquiler en tu base de datos si es necesario.
  
      // Responder con un mensaje de éxito y el costo total
      res.status(200).json({ mensaje: 'Alquiler exitoso', costoTotal: costoCalculado });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  };
  
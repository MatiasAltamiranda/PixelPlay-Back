const Game = require('../models/gameModel');
const {Review} = require('../models/review');

// Controlador para crear una revisión en un juego
const createReview = async (req, res) => {
  try {
    const { gameId } = req.params; // ID del juego obtenido de los parámetros de la ruta
    const { title, content, rating } = req.body; // Datos de la revisión obtenidos del cuerpo de la solicitud
    const userId = req.user._id; // ID del usuario obtenido del middleware de autenticación

    // Verificar si el juego existe
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ error: 'No se encontró el juego' });
    }

    // Crear una nueva revisión
    const review = new Review({
      title,
      content,
      rating,
      user: userId,
      game: gameId,
    });

    // Guardar la revisión en la base de datos
    await review.save();

    // Agregar la revisión al arreglo "reviews" del juego y guardar el juego
    game.reviews.push(review);
    await game.save();

    res.status(201).json({ message: 'Revisión creada exitosamente' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error al crear la revisión' });
  }
};

module.exports = {
  createReview,
};

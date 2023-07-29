const User = require("../models/userModel");
const {Game} = require("../models/gameModel"); 




exports.getCartUser = async (req,res) =>{
    try {
      const {user}= req;
      const cartUserFind = await User.findById(user.id)
      const {cart} = cartUserFind
      res.status(200).json({
        ok:true,
        carrito : cart
      })  
    } catch (error) {
        console.log(error);
        res.status(500).json("Error al traer el carrito")
    }
}

exports.removeFromCart = async (req, res) => {
  try {
    const { user } = req;
    const { gameId } = req.params;
    const gameIdAsString = gameId.toString();

    const cartUserFind = await User.findById(user.id);

    if (!cartUserFind) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const gameIndex = cartUserFind.cart.findIndex((item) => item.game._id.toString() === gameIdAsString);
    console.log(gameId)
    console.log(gameIdAsString)
    console.log(user.cart)
    if (gameIndex === -1) {
      return res.status(404).json({ error: 'Juego no encontrado en el carrito del usuario' });
    }

    cartUserFind.cart.splice(gameIndex, 1);

    await cartUserFind.save();

    res.status(200).json({ ok: true, message: 'Juego eliminado del carrito' });
  } catch (error) {
    console.error('Error al eliminar el juego del carrito:', error);
    res.status(500).json({ error: 'Hubo un error al eliminar el juego del carrito' });
  }
};



exports.addToCart = async (req, res, next) => {
  try {
    const { gameId } = req.params;
    const { user } = req; 
    const gameIndex = user.cart.findIndex((item) => item.game._id.equals(gameId));
    if (gameIndex !== -1) {
      return res.status(400).json({ error: "El juego ya está en el carrito." });
    }

  
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ error: "El juego no existe." });
    }


    user.cart.push({ game });


    await user.save();

    res.status(200).json({ message: "Juego añadido al carrito exitosamente." });
  } catch (error) {
    next(error);
  }
};

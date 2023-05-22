const Game = require("../models/gameModel")


exports.getGames = async (req,res) =>{
    try {
      const games = await Game.find({});
      return res.status(200).json({Games : games})
    } catch (error) {
        res.status(500).json("Hubo un error al traer los juegos")
    }
}

exports.createGame = async (req, res) =>{
    try {
        const game = await Game.create(req.body );
        res.status(201).json({ok:true,message : "El juego se creo exitosamente", Game : game})
     } catch (error) {
         console.log(error);
         res.status(500).json("Hubo un error al crear el juegoo")
     }
}

exports.deleteGame = async (req, res) =>{
    try {
        await Game.findByIdAndRemove(req.params.id);
        res.status(200).json("El juego se borro exitosamente")
     } catch (error) {
         res.status(500).json("Hubo un error al crear el juegoo")
     }
}
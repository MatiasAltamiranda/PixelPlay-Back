const Game = require("../models/gameModel")
const fs = require('fs');

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
        const game = await Game.create({...req.body, user:req.user._id} );
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

exports.getCategory= async (req, res) =>{
    try {
       const categoria = req.params.category;
       const games = await Game.find({ category: categoria });
        res.status(200).json(games)
     } catch (error) {
         res.status(500).json("error al traer los juegos")
     }
}

exports.getProductBySlug = async (req, res) => {
    try {
      const gameSlug = await Game.findOne({ slug: req.params.slug });
      res.status(200).json({ game: gameSlug });
    } catch (error) {
      res.status(500).json("Error al traer los juegos por slug");
    }
  };


  exports.updateGame = async (req, res) => {
    const { id } = req.params;
    try {
      if (req.body.slug) {
        return res.status(400).json("No se pueden modificar esos campos");
      }
  
      const filteredBody = {
        tittle: req.body.tittle,
        description: req.body.description,
        category: req.body.category,
        franchise: req.body.franchise,
        price: req.body.price,
        developer: req.body.developer,
        coverImage: req.filteredBody.coverImage,
        images: req.filteredBody.images,
      };
  
      if (req.filteredBody.coverImage) {
        // Eliminar la foto de portada anterior si existe y no se llama "default_profile.jpg"
        if (req.body.coverImage && req.body.coverImage !== "default_profile.jpg") {
          const filePath = `public/img/games/${req.body.coverImage}`;
          fs.unlinkSync(filePath);
        }
      }
  
      if (req.body.images && req.body.images.length > 0) {
        // Eliminar las imágenes anteriores si existen
        req.body.images.forEach((image) => {
          if (image !== "default_profile.jpg") {
            const filePath = `public/img/games/${image}`;
            fs.unlinkSync(filePath);
          }
        });
      }
  
      const updateGame = await Game.findByIdAndUpdate(id, filteredBody, {
        new: true,
        runValidators: true,
      });
  

      return res.status(200).json({ game: updateGame });
    } catch (error) {

      return res.status(500).json("Error al editar el juego");
    }
  };
  
  
  
  
  

  
  exports.getGame = async(req,res)=>{
    const {id} = req.params;
    try {
        const game = await Game.findById(id);
        if(!game){
            res.status(404).json("No se encontro el juego con ese id");
        }
        res.status(200).json({game: game})
    } catch (error) {
        res.status(500).json("Error por id");
    }
  }
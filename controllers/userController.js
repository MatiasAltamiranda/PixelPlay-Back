const fs = require('fs');
const User = require("../models/userModel");
const Game = require('../models/gameModel');


exports.getUsers = (req,res) =>{
    try {
       res.status(200).json("Conexion con exito users pixel play")
    } catch (error) {
        console.log(error);
        res.status(500).json("Hubo un error al traer usuarios")
    }
}

exports.createUser = async (req,res)=>{
    try {
        const user = await User.create(req.body );
        res.status(201).json({ok:true,message : "El usuario se creo exitosamente", User : user})
    } catch (error) {
        res.status(500).json("Hubo un error al crear usuarios")
    }
}


exports.updateMe = async (req, res) => {
    try {
      if (req.body.password || req.body.confirmPassword || req.body.role) {
        return res.status(400).json("No se pueden modificar esos campos");
      }
  
      const filteredBody = { name: req.body.name,lastname:req.body.lastname, email: req.body.email };
  
      if (req.file) {
        // Eliminar la foto de perfil anterior si existe y no se llama "default_imagen"
        if (req.user.profilePhoto && req.user.profilePhoto !== 'default_profile.jpg') {
          const filePath = `public/img/users/${req.user.profilePhoto}`;
          fs.unlinkSync(filePath);
        }
  
        filteredBody.profilePhoto = req.file.filename;
      }
  
      const updateUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
        new: true,
        runValidators: true
      });
  
      return res.status(200).json({ ok: true, data: { user: updateUser } });
    } catch (error) {
      return res.status(500).json("Hubo un error al traer usuarios");
    }
  };
  

  





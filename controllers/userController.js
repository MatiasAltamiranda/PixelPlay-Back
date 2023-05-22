const User = require("../models/userModel");



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
        console.log(req.body)
        console.log(error)
        res.status(500).json("Hubo un error al crear usuarios")
    }
}
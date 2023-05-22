const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();



exports.protect = async (req,res,next) =>{
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1];
        }
        if(!token){
            return res.status(401).json("No tiene acceso")
        }
       jwt.verify(token, process.env.SECRET_TOKEN, async (error,data)=>{
            if(error) return res.status(401).json("No tiene acceso lvl 2");
            const user = await User.findById(data.id);
            if(!user){return res.status(401).json("No tiene acceso lvl 3")
        }
        if(user.passwordChangeAfter(data.iat)){
            return res.status(401).json("No tiene acceso lvl 4")
        }
        req.user = user;
        next();
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json("Error")
    }
}


exports.restrictTo= (...roles) =>{
    return (req,res,next) =>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json("Sin permiso")
        }
        next();
    }
}
const User = require("../models/userModel");
const sendEmail = require("../utils/mail");
const {signToken} = require("../utils/token");
const crypto = require("crypto");

exports.signUp = async (req,res)=>{
    try {
        const newUser = await User.create({
            name : req.body.name,
            lastname : req.body.lastname,
            email : req.body.email,
            password : req.body.password,
            confirmPassword : req.body.confirmPassword
        });
        const {name,role,_id,email} = newUser
        const token = signToken(newUser._id)
        res.status(201).json({
            token,
            data:{
            user:{name,role,_id,email}
        }})
    } catch (error) {
      res.status(500).json({error : error})  
    }
}


exports.login= async(req,res)=>{
    try {
       const {email,password} = req.body;
       if(!email || !password){
        return res.status(400).json("Error al loguearse")
       }
       const user = await User.findOne({email}).select("+password");
       if( !user || !(await user.comparePassword(password, user.password))){
        return res.status(401).json("Las credenciales no son correctas")
       }
       const {name,role,_id,email: userEmail} = user;
       const token = signToken(user._id)
       return res.status(200).json({
        token,
        data:{
        user : {name,role,_id,email: userEmail}
      } 
       })
    } catch (error) {
        console.log(error)
      res.status(500).json({error : "Ups algo salio mal"})  
    }
}



exports.forgotPassword = async (req,res)=>{
    try {
       const {email} = req.body;
       const user = await User.findOne({email});
       if(!user){
        return res.status(400).json({error : "El mail no existe"})  
       }
       const resetToken = user.createPasswordResetToken();
       await user.save({validateBeforeSave : false});
       const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/auth/resetPassword/${resetToken}`;
       const message = `Para cambiar su contraseña ingrese al siguiente enlace ${resetUrl}`;
       await sendEmail({message,email,subject:"Recuperar contraseña"});
       return res.status(200).json({message:"Se envio un mail a la casilla indicada por favor verifique"})
    } catch (error) {
      res.status(500).json({error : error})  
    }
}


exports.resetPassword = async(req,res)=>{
    try {
       const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
       const user = await User.findOne({
        passwordResetToken : hashedToken,
        passwordResetExpires : {$gt : Date.now()}
       })
       if(!user){
        return res.status(400).json("Algo salio mal")
       }
       user.password = req.body.password;
       user.confirmPassword = req.body.confirmPassword;
       user.passwordResetToken = undefined;
       user.passwordResetExpires = undefined;
       await user.save();
       const token = signToken(user._id);
       return res.status(200).json({ok:true,token})
    } catch (error) {
      return res.status(500).json({error : "Ups algo salio mal"})  
    }
}

exports.getUser = async (req,res)=>{
  try {
     if(req.user){
      return res.status(200).json({user : req.user})
     }
  } catch (error) {
    console.log(error)
    res.status(500).json({error : error})  
  }
}

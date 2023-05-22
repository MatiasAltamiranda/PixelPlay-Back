const jwt = require("jsonwebtoken")
require("dotenv").config();


exports.signToken =(id) =>{
    return jwt.sign(
        {id},
        process.env.SECRET_TOKEN,
        {expiresIn: '1h'}
        )
}
const mongoose = require("mongoose");


const connectDB = async () =>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL)
        console.log("Conectado con exito a dbMongo")
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}

module.exports = connectDB;
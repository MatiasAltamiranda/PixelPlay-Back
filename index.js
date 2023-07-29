const express = require("express");
require("dotenv").config();
const connectDB = require('./config/db');
const cors = require ("cors")

// Routes
const userRoutes = require("./routes/userRoutes")
const gameRoute = require("./routes/gameRoute")
const authRoutes = require("./routes/authRoutes")
const reviewRoute = require("./routes/reviewsRoute")
const cartRoutes = require("./routes/cartRoutes")

connectDB();

const app = express();

app.use(express.static(`${__dirname}/public`));

app.use(cors());

app.use(express.json({limit : "110kb"})),


app.use('/api/v1/users',userRoutes )
app.use('/api/v1/auth',authRoutes )
app.use('/api/v1/games', gameRoute)
app.use('/api/v1/reviews', reviewRoute)
app.use("/api/v1/carrito", cartRoutes);


/*
 
app.use('/api/v1/categories') */


app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})
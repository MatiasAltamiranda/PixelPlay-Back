const express = require("express");
const {addToCart,getCartUser,removeFromCart} = require("../controllers/cartController");
const {protect} = require ("../middlewares/auth")


const router = express.Router();


// Agregar un juego al carrito
router
.get("/getCarUser",protect,getCartUser)
.delete('/delete/:gameId',protect, removeFromCart);
router.post("/agregar/:gameId",protect, addToCart);

module.exports = router;
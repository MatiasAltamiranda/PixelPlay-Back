const {Router} = require("express");
const {getGames,createGame,deleteGame} = require("../controllers/gameController")
const {protect,restrictTo} = require ("../middlewares/auth")

const router = Router();


router.route("/")
.get(getGames)
.post(createGame)

router.route("/:id")
.delete(protect,restrictTo("admin","super"),deleteGame)



module.exports = router;
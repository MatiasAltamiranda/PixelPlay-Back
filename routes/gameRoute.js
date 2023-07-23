const { Router } = require("express");
const {
  getGames,
  createGame,
  deleteGame,
  getCategory,
  getProductBySlug,
  updateGame,
  getGame,
} = require("../controllers/gameController");
const { protect, restrictTo } = require("../middlewares/auth");
const { uploadGameImages } = require("../middlewares/photos");
const { resizeGamePhotos,resizeUpdatePhotosGame } = require("../middlewares/resize");

const router = Router();

router
  .route("/")
  .get(getGames)
  .post(
    protect,
    restrictTo("admin", "super"),
    uploadGameImages,
    resizeGamePhotos,
    createGame
  );

router.route("/game/:slug").get(getProductBySlug);

router
  .route("/:id")
  .delete(protect, restrictTo("admin", "super"), deleteGame)
  .put(
    protect,
    restrictTo("admin", "super"),
    uploadGameImages,
    resizeUpdatePhotosGame,
    updateGame
  )
  .get((protect, restrictTo("admin", "super"), getGame));

router.route("/category/:category").get(getCategory);

module.exports = router;

const {Router} = require("express");
const {signUp,login,forgotPassword,resetPassword,getUser} = require("../controllers/authController")
const {protect} = require ("../middlewares/auth")

const router = Router();


router.route("/signup")
.post(signUp)


router.route("/login")
.post(login)


router.route('/forgotPassword')
.post(forgotPassword)

router.route("/resetPassword/:token")
.post(resetPassword)

router.route("/user")
.get(protect,getUser)

module.exports = router;
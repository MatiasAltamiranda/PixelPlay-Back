const {Router} = require("express");
const {getUsers,createUser,updateMe} = require("../controllers/userController")
const {protect} = require ("../middlewares/auth")
const {uploadUserPhoto} = require ("../middlewares/photos")
const {resizeUserPhoto} = require ("../middlewares/resize")



const router = Router();


router.route("/")
.get(getUsers)
.post(createUser)
.put(protect,uploadUserPhoto,resizeUserPhoto,updateMe)




module.exports = router;
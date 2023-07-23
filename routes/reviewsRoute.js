const {Router} = require('express');
const {createReview} = require('../controllers/reviewController');

const {protect} = require ("../middlewares/auth")


const router = Router();


router.post('/:gameId', protect,createReview);

module.exports = router;
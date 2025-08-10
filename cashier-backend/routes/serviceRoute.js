const express = require('express');
const { isVerifiedUser } = require('../middlewares/tokenVerification');
const upload = require('../middlewares/multer')

const { addService, updateService, getServices, removeService ,updateBuyQuantities ,updateSaleQuantities} = require('../controllers/serviceController');


const router = express.Router();

router.post('/', upload.single('image'), isVerifiedUser, addService);
router.put('/:id', upload.single('image'), isVerifiedUser, updateService);

router.route('/fetch').post(isVerifiedUser, getServices)
router.route('/remove').post(isVerifiedUser, removeService)
router.route('/update-buyquantities').post(isVerifiedUser, updateBuyQuantities);
router.route('/update-salequantities').post(isVerifiedUser, updateSaleQuantities);


module.exports = router;


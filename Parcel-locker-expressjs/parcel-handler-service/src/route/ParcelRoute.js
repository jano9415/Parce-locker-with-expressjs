const {Router} = require("express");
const parcelController = require('../contoller/ParcelController');

const router = Router();

router.get("/getparcels", parcelController.getParcels);
router.get("/getparcel", parcelController.getParcel);

module.exports = router;
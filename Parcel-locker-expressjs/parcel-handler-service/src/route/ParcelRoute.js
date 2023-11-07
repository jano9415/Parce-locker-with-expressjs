const {Router} = require("express");
const parcelController = require('../contoller/ParcelController');

const router = Router();

router.post("/sendparcelwithoutcode/:senderParcelLockerId", parcelController.sendParcelWithoutCode);
router.get("/getparcelsforshipping/:senderParcelLockerId", parcelController.getParcelsForShipping);


module.exports = router;
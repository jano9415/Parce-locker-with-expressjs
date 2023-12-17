const {Router} = require("express");
const parcelController = require('../contoller/ParcelController');

const router = Router();

router.post("/sendparcelwithoutcode/:senderParcelLockerId", parcelController.sendParcelWithoutCode);
router.get("/getparcelsforshipping/:senderParcelLockerId", parcelController.getParcelsForShipping);
router.post("/emptyparcellocker", parcelController.emptyParcelLocker);
router.get("/getparcelsforparcellocker/:senderParcelLockerId/:uniqueCourierId", parcelController.getParcelsForParcelLocker);
router.get("/fillparcellocker/:senderParcelLockerId/:uniqueCourierId",parcelController.fillParcelLocker);


module.exports = router;
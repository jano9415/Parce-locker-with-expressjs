const Router = require("express");
const parcelLockerController = require("../contoller/ParcelLockerController");

const router = Router();

router.get("/getparcellockersforchoice", parcelLockerController.getParcelLockersForChoice);
router.get("/isparcellockerfull/:senderParcelLockerId", parcelLockerController.isParcelLockerFull);
router.get("/areboxesfull/:senderParcelLockerId", parcelLockerController.areBoxesFull);
router.get("/getsaturationdatas/:parcelLockerId", parcelLockerController.getSaturationDatas);

module.exports = router;
const Router = require("express");
const parcelLockerController = require("../contoller/ParcelLockerController");

const router = Router();

router.get("/get", parcelLockerController.getParcelLocker);

module.exports = router;
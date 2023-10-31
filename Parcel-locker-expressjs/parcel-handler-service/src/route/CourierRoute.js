const {Router} = require("express");
const courierController = require('../contoller/CourierController');

const router = Router();

router.get("/iscouriereligible/:parcelLockerId/:uniqueCourierId", courierController.isCourierEligible);
router.post("/createcourier", courierController.createCourier);


module.exports = router;
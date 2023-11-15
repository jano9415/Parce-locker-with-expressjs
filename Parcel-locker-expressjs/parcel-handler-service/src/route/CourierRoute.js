const {Router} = require("express");
const courierController = require('../contoller/CourierController');

const router = Router();

router.get("/iscouriereligible/:parcelLockerId/:uniqueCourierId", courierController.isCourierEligible);
router.post("/createcourier", courierController.createCourier);
router.get("/getcouriers", courierController.getCouriers);
router.get("/findcourierbyid/:courierId", courierController.findCourierById);


module.exports = router;
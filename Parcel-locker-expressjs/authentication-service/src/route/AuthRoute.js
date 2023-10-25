const Router = require("express");
const authController = require("../controller/AuthController");

const router = Router();

router.get("/authpelda", authController.authPelda);
router.post("/login", authController.login);
router.post("/signup", authController.signUp);
router.post("/courierlogin/:parcelLockerId", authController.courierLogin);
router.get("/activation/:signUpActivationCode", authController.signUpActivation);
router.post("/createcourier", authController.createCourier);
router.post("/createadmin", authController.createAdmin);
router.put("/updatecourier", authController.updateCourier);


module.exports = router;

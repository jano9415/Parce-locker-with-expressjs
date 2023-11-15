const {Router} = require("express");
const storeController = require('../contoller/StoreController');

const router = Router();

router.get("/getstores", storeController.getStores);


module.exports = router;
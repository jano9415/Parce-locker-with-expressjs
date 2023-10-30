const {Router} = require("express");
const userController = require('../contoller/UserController');

const router = Router();

router.post("/createuser", userController.createUser);


module.exports = router;
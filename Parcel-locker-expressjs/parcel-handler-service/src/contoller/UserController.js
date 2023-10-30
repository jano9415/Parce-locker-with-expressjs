const userService = require("../service/UserService");

//Új user hozzáadása az adatbázishoz. Az objektum az authentication service-ből jön
const createUser = (req, res) => {
    userService.createUser(req, res);
}

module.exports = {
    createUser,
};
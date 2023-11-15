const storeService = require("../service/StoreService");

//Központi raktárak lekérése
//Jwt token szükséges
//Admin szerepkör szükséges
const getStores = (req, res) => {
    storeService.getStores(req, res);
}

module.exports = {
    getStores,
};
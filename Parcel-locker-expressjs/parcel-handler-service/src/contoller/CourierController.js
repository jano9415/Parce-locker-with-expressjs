const courierService = require("../service/CourierService");


//Futár jogosultságának ellenőrzése az automatához
//Csak a saját körzetében lévő automatákba tud bejelentkezni
//Az authentication service hívja meg ezt a kérést
const isCourierEligible = (req, res) => {
    courierService.isCourierEligible(req, res);
}

//Új futár hozzáadása az adatbázishoz. Az objektum az authentication service-ből jön
const createCourier = (req, res) => {
    courierService.createCourier(req, res);
}

module.exports = {
    isCourierEligible,
    createCourier,
};
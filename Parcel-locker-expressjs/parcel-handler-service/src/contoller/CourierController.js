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

//Összes futár lekérése
//Jwt token szükséges
//Admin szerepkör szükséges
const getCouriers = (req, res) => {
    courierService.getCouriers(req, res);
}

//Futár lekérése id alapján
//Jwt token szükséges
//Admin szerepkör szükséges
const findCourierById = (req, res) => {
    courierService.findCourierById(req, res);
}

module.exports = {
    isCourierEligible,
    createCourier,
    getCouriers,
    findCourierById,
};
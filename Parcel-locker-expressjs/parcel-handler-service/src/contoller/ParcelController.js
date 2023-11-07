const { Parcel, sequelize, Courier } = require("../sequelize/models");
const parcelService = require("../service/ParcelService");


//Csomag küldése feladási kód nélkül
//Nem szükséges jwt token
const sendParcelWithoutCode = (req, res) => {
    parcelService.sendParcelWithoutCode(req, res);
}

//Csomagok lekérése, amik készen állnak az elszállításra
//Jwt token szükséges
//Courier szerepkör szükséges
const getParcelsForShipping = (req, res) => {
    parcelService.getParcelsForShipping(req, res);
}

module.exports = {
    sendParcelWithoutCode,
    getParcelsForShipping,
};
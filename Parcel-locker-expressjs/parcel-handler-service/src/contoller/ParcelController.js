const { Parcel, sequelize, Courier } = require("../sequelize/models");
const parcelService = require("../service/ParcelService");


const sendParcelWithoutCode = (req, res) => {
    parcelService.sendParcelWithoutCode(req, res);
}

module.exports = {
    sendParcelWithoutCode,
};
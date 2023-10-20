const { Parcel, sequelize } = require("../sequelize/models");
const initDb = require("../config/InitDatabase");

//Csomag küldése feladási kód nélkül
//Nem szükséges jwt token
const sendParcelWithoutCode = () => {

}

module.exports = {
    sendParcelWithoutCode
};


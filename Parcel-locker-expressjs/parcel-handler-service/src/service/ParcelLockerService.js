const { ParcelLocker, sequelize } = require("../sequelize/models");

//Csomag automaták lekérése. Ezekből lehet kiválasztani a feladási vagy érkezési automatát
//Nem szükséges jwt token
const getParcelLockersForChoice = () => {

}

//Feladási automata tele van?
//Nem szükséges jwt token
const isParcelLockerFull = () => {

}

//Rekeszek tele vannak? Kicsi, közepes, nagy rekeszek ellenőrzése
//Nem szükséges jwt token
const areBoxesFull = () => {

}

//Automata telítettségi adatok lekérése
//Nem szükséges jwt token
const getSaturationDatas = () => {

}

module.exports = {
    getParcelLockersForChoice,
    isParcelLockerFull,
    areBoxesFull,
    getSaturationDatas
};
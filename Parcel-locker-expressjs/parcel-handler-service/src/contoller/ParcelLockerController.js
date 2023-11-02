const parcelLockerService = require("../service/ParcelLockerService");


//Csomag automaták lekérése. Ezekből lehet kiválasztani a feladási vagy érkezési automatát
//Nem szükséges jwt token
const getParcelLockersForChoice = (req, res) => {
    parcelLockerService.getParcelLockersForChoice(req, res);

}

//Feladási automata tele van?
//Nem szükséges jwt token
const isParcelLockerFull = (req, res) => {
    parcelLockerService.isParcelLockerFull(req, res);
}

//Rekeszek tele vannak? Kicsi, közepes, nagy rekeszek ellenőrzése
//Nem szükséges jwt token
const areBoxesFull = () => {
    parcelLockerService.areBoxesFull(req, res);
}

//Automata telítettségi adatok lekérése
//Nem szükséges jwt token
const getSaturationDatas = () => {
    parcelLockerService.getSaturationDatas(req, res);
}

module.exports = {
    getParcelLockersForChoice,
    isParcelLockerFull,
    areBoxesFull,
    getSaturationDatas
};
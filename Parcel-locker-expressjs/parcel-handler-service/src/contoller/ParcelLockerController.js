const parcelLockerService = require("../service/ParcelLockerService");


const getParcelLockersForChoice = (req, res) => {
    parcelLockerService.getParcelLockersForChoice();
}

const isParcelLockerFull = (req, res) => {
    parcelLockerService.isParcelLockerFull();
}

const areBoxesFull = () => {
    parcelLockerService.areBoxesFull();
}

const getSaturationDatas = () => {

}

module.exports = {
    getParcelLockersForChoice,
    isParcelLockerFull,
    areBoxesFull,
    getSaturationDatas
};
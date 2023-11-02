const { ParcelLocker, sequelize, Address, Parcel } = require("../sequelize/models");
const initDb = require("../config/InitDatabase");

//Csomag automaták lekérése. Ezekből lehet kiválasztani a feladási automatát.
const getParcelLockersForChoice = (req, res) => {

    ParcelLocker.findAll({
        include: {
            model: Address,
            as: "location"
        },
    }).then(parcelLockers => {
        const responseDTO = [];
        for (let i = 0; i < parcelLockers.length; i++) {
            const parcelLockerDTO = {
                id: parcelLockers[i].id,
                postCode: parcelLockers[i].location.postCode,
                county: parcelLockers[i].location.county,
                city: parcelLockers[i].location.city,
                street: parcelLockers[i].location.street,
                amountOfBoxes: parcelLockers[i].amountOfBoxes
            };
            responseDTO.push(parcelLockerDTO);
        }
        res.status(200).json(responseDTO);
    }).catch(error => {

    })

}

//Feladási automata tele van?
const isParcelLockerFull = (req, res) => {

    const senderParcelLockerId = req.param.senderParcelLockerId;
    const stringResponse = {};

    ParcelLocker.findOne({
        where: { id: senderParcelLockerId },
        include: {
            model: Parcel,
            as: "parcels"
        }
    }).then(parcelLocker => {
        if(parcelLocker.parcels.length == parcelLocker.amountOfBoxes){
            stringResponse.message = "full";
            res.status(200).json(stringResponse);
        }
        stringResponse.message = "notfull";
        res.status(200).json(stringResponse);

    }).catch(error => {

    })
}

//Rekeszek tele vannak? Kicsi, közepes, nagy rekeszek ellenőrzése
const areBoxesFull = () => {

}

//Automata telítettségi adatok lekérése
const getSaturationDatas = () => {

}

//Rekeszek tele vannak? Kicsi, közepes, nagy rekeszek ellenőrzése.
const checkBoxes = (size, senderParcelLockerId) => {

}

//Teli rekeszek számának ellenőrzése. Kicsi, közepes vagy nagy rekeszek
const fullBoxesNumber = (parcelLockerId) => {
    
}

module.exports = {
    getParcelLockersForChoice,
    isParcelLockerFull,
    areBoxesFull,
    getSaturationDatas,
};
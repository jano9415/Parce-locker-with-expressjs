const { ParcelLocker, sequelize, Address, Parcel, Box } = require("../sequelize/models");
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

    const senderParcelLockerId = req.params.senderParcelLockerId;
    const stringResponse = {};

    ParcelLocker.findOne({
        where: { id: senderParcelLockerId },
        include: {
            model: Parcel,
            as: "parcels"
        }
    }).then(parcelLocker => {
        if (parcelLocker.parcels.length == parcelLocker.amountOfBoxes) {
            stringResponse.message = "full";
            res.status(200).json(stringResponse);
        }
        stringResponse.message = "notfull";
        res.status(200).json(stringResponse);

    }).catch(error => {

    })
}

//Rekeszek tele vannak? Kicsi, közepes, nagy rekeszek ellenőrzése
const areBoxesFull = (req, res) => {

    const senderParcelLockerId = req.params.senderParcelLockerId;

    const stringResponses = [
        {
            message: checkBoxes("small", senderParcelLockerId)
        },
        {
            message: checkBoxes("medium", senderParcelLockerId)
        },
        {
            message: checkBoxes("small", senderParcelLockerId)
        }
    ];

    res.status(200).json(stringResponses);

}

//Automata telítettségi adatok lekérése
const getSaturationDatas = (req, res) => {

    const parcelLockerId = req.params.parcelLockerId;
    const response = {};

    console.log("Automata id: " + parcelLockerId);

    //A tömb első eleme a kicsi teli rekeszek száma
    //A tömb második eleme a közepes teli rekeszek száma
    //A tömb harmadik eleme a nagy teli rekeszek száma
    const amounts = fullBoxesNumber(parcelLockerId);

    console.log("Adatok: " + amounts);

    ParcelLocker.findOne({
        where: { id: parcelLockerId },
    }).then(parcelLocker => {
        response.amountOfBoxes = parcelLocker.amountOfBoxes;
        response.amountOfSmallBoxes = parcelLocker.amountOfSmallBoxes;
        response.amountOfMediumBoxes = parcelLocker.amountOfMediumBoxes;
        response.amountOfLargeBoxes = parcelLocker.amountOfLargeBoxes;
        response.amountOfFullSmallBoxes = 0;
        response.amountOfFullMediumBoxes = 0;
        response.amountOfFullLargeBoxes = 0;

        res.status(200).json(response);

    }).catch(error => {

    })

}

//Rekeszek tele vannak? Kicsi, közepes, nagy rekeszek ellenőrzése.
const checkBoxes = (size, senderParcelLockerId) => {


    ParcelLocker.findOne({
        where: { id: senderParcelLockerId },
        include: {
            model: Parcel,
            as: "parcels",
            include: {
                model: Box,
                as: "box"
            }
        }
    }).then(parcelLocker => {
        let counter = 0;

        parcelLocker.parcels.map(parcel => {
            if (parcel.box.size === size) {
                counter++;
            }
        });

        //Automata kis rekeszeinek ellenőrzése
        if (size === "small") {

            //Automata kis rekeszei tele vannak
            if (parcelLocker.amountOfSmallBoxes === counter) {
                return "full";
            }

            //Automata kis rekeszei nincsenek tele
            return "notfull";

        }

        //Automata közepes rekeszeinek ellenőrzése
        if (size === "medium") {

            //Automata közepes rekeszei tele vannak
            if (parcelLocker.amountOfMediumBoxes === counter) {
                return "full";
            }

            //Automata közepes rekeszei nincsenek tele
            return "notfull";

        }

        //Automata nagy rekeszeinek ellenőrzése
        if (size === "large") {

            //Automata nagy rekeszei tele vannak
            if (parcelLocker.amountOfLargeBoxes === counter) {
                return "full";
            }

            //Automata nagy rekeszei nincsenek tele
            return "notfull";

        }
    }).catch(error => {

    })
}

//Teli rekeszek számának ellenőrzése. Kicsi, közepes vagy nagy rekeszek
const fullBoxesNumber = (parcelLockerId) => {

    //A tömb első eleme a kicsi teli rekeszek száma
    //A tömb második eleme a közepes teli rekeszek száma
    //A tömb harmadik eleme a nagy teli rekeszek száma
    const amounts = [];
    let smallCounter = 0;
    let mediumCounter = 0;
    let largeCounter = 0;

    ParcelLocker.findOne({
        where: { id: parcelLockerId },
        include: {
            model: Parcel,
            as: "parcels",
            include: {
                model: Box,
                as: "box"
            }
        }
    }).then(parcelLocker => {
        parcelLocker.parcels.map(parcel => {
            if (parcel.box.size === "small") {
                smallCounter++;
            }
            if (parcel.box.size === "medium") {
                mediumCounter++;
            }
            if (parcel.box.size === "large") {
                largeCounter++;
            }
        })
        amounts.push(smallCounter);
        amounts.push(mediumCounter);
        amounts.push(largeCounter);

        return amounts;

    }).catch(error => {

    })

}

module.exports = {
    getParcelLockersForChoice,
    isParcelLockerFull,
    areBoxesFull,
    getSaturationDatas,
};
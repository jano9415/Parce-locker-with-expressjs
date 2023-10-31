const { Courier, ParcelLocker, Store, sequelize } = require("../sequelize/models");

//Futár jogosultságának ellenőrzése az automatához
//Csak a saját körzetében lévő automatákba tud bejelentkezni
const isCourierEligible = (req, res) => {

    const parcelLockerId = req.params.parcelLockerId;
    const uniqueCourierId = req.params.uniqueCourierId;
    const stringResponse = {};

    Courier.findOne({
        where: { uniqueCourierId: uniqueCourierId },
        include: {
            model: Store,
            as: 'area'
        },

    }).then(courier => {
        ParcelLocker.findOne({
            where: { parcelLockerId: parcelLockerId }
        }).then(parcelLocker => {
            if (courier.area.id === parcelLocker.id) {
                stringResponse.message = "eligible";
                res.status(200).json(stringResponse);
            }
            stringResponse.message = "notEligible";
            res.status(200).json(stringResponse);
        }).catch(error => {

        })

    }).catch(error => {

    })

}

//Új futár hozzáadása az adatbázishoz.
//A futár objektum az authentication-service-ből jön
const createCourier = (req, res) => {

    const requestBody = req.body;
    const stringResponse = {};

    Store.findOne({ where: { id: requestBody.storeId } })
        .then(store => {
            Courier.create({
                uniqueCourierId: requestBody.uniqueCourierId,
                firstName: requestBody.firstName,
                lastName: requestBody.lastName,
            }).then(courier => {
                courier.setArea(store);
                stringResponse.message = "successfulCreation";
                res.status(201).json(stringResponse);
            }).catch(error => {

            })

        })
        .catch(error => {

        })
}

module.exports = {
    isCourierEligible,
    createCourier,
};
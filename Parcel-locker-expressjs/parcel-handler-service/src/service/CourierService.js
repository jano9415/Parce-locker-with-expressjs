const { Courier, ParcelLocker, Store, Address, sequelize } = require("../sequelize/models");

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
            where: { id: parcelLockerId },
            include: {
                model: Store,
                as: "store"
            },
        }).then(parcelLocker => {
            if (courier.area.id === parcelLocker.store.id) {
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

//Összes futár lekérése
const getCouriers = (req, res) => {

    Courier.findAll({
        include: {
            model: Store,
            as: "area",
            include: {
                model: Address,
                as: "location"
            }
        }
    }).then(couriers => {
        const requestDTO = [];

        couriers.map(courier => {
            const courierDTO = {
                id: courier.id,
                uniqueCourierId: courier.uniqueCourierId,
                firstName: courier.firstName,
                lastName: courier.lastName,
                storeId: courier.area.id,
                storePostCode: courier.area.location.postCode,
                storeCounty: courier.area.location.county,
                storeCity: courier.area.location.city,
                storeStreet: courier.area.location.street,
            };
            requestDTO.push(courierDTO);
        });
        res.status(200).json(requestDTO);

    }).catch(error => {

    })

}

const findCourierById = (req, res) => {

    const courierId = req.params.courierId;

    Courier.findOne({
        where: { id: courierId },
        include: {
            model: Store,
            as: "area",
            include: {
                model: Address,
                as: "location"
            }
        }
    }).then(courier => {

        const courierDTO = {
            id: courier.id,
            uniqueCourierId: courier.uniqueCourierId,
            firstName: courier.firstName,
            lastName: courier.lastName,
            storeId: courier.area.id,
            storePostCode: courier.area.location.postCode,
            storeCounty: courier.area.location.county,
            storeCity: courier.area.location.city,
            storeStreet: courier.area.location.street,
        };

        res.status(200).json(courierDTO);

    }).catch(error => {

    })


}

module.exports = {
    isCourierEligible,
    createCourier,
    getCouriers,
    findCourierById,
};
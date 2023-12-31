const { Parcel, ParcelLocker, Box, Address, Courier } = require("../sequelize/models");
const initDb = require("../config/InitDatabase");
const { DATEONLY, TIME } = require("sequelize");
const producer = require("../kafka/Producer");

//Random string generálása
const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }
    return randomString;
}

//Aktuális dátum
const currentDate = () => {
    const date = new Date();
    const currDate = date.toISOString().slice(0, 10);
    return currDate;
}

//Aktuális időpont
const currentTime = () => {
    const time = new Date();
    const currTime = time.toTimeString().slice(0, 8);
    return currTime;
}

//Csomag küldése feladási kód nélkül
//Nem szükséges jwt token
const sendParcelWithoutCode = (req, res) => {

    const requestBody = req.body;
    const senderParcelLockerId = req.params.senderParcelLockerId;
    const response = {};

    //Feladási automata
    ParcelLocker.findOne({
        where: { id: senderParcelLockerId },
        include: [
            {
                model: Parcel,
                as: "parcels",
                include: {
                    model: Box,
                    as: "box"
                }
            },
            {
                model: Address,
                as: "location"
            }
        ]

    }).then(senderParcelLocker => {
        //Érkezési automata
        ParcelLocker.findOne({
            where: { id: requestBody.selectedParcelLockerId },
            include: {
                model: Address,
                as: "location",
            }
        }).then(receiverParcelLocker => {

            //A kiválasztott mérethez tartozó rekeszek
            Box.findAll({
                where: { size: requestBody.parcelSize },
            }).then(boxes => {


                //Feladási automata teli rekeszei
                const fullBoxes = senderParcelLocker.parcels.map(parcel => parcel.box);
                //Üres rekeszek keresése
                const emptyBoxes = boxes.filter(box => !fullBoxes.some(fullBox => fullBox.boxNumber === box.boxNumber));


                //Itt lehetne ellenőrizni, hogy az automatában van-e hely
                //De az már megtörtént küldés előtt
                //Frontenden csak akkor enged küldeni, ha van szabad hely
                /*if (emptyBoxes === null) {
                    stringResponse.message = "parcelLockerIsFull";
                    res.status(200).json(response);
                }*/


                //Csomag létrehozása
                Parcel.create({
                    //Csomag változóinak beállítása
                    uniqueParcelId: generateRandomString(10),
                    senderName: requestBody.senderName,
                    senderEmailAddress: requestBody.senderEmailAddress,
                    size: requestBody.parcelSize,
                    price: requestBody.price,
                    receiverName: requestBody.receiverName,
                    receiverEmailAddress: requestBody.receiverEmailAddress,
                    isShipped: false,
                    isPickedUp: false,

                    sendingDate: currentDate(),
                    sendingTime: currentTime(),
                    shippingDate: null,
                    shippingTime: null,
                    pickingUpDate: null,
                    pickingUpTime: null,
                    isPlaced: true,
                    pickingUpCode: generateRandomString(5),

                }).then(parcel => {

                    //Ha a csomag ára 0, akkor már ki van fizetve. Különben nincs
                    if (requestBody.price === 0) {
                        parcel.paid = true;
                    }

                    //Feladási és érkezési automata
                    parcel.setShippingFrom(senderParcelLocker);
                    parcel.setShippingTo(receiverParcelLocker);


                    parcel.setUser(null);
                    parcel.setStore(null);
                    parcel.setCourier(null);

                    parcel.setBox(emptyBoxes[0]);

                    //Csomag és automata összerendelése
                    parcel.setParcelLocker(senderParcelLocker);

                    //Email küldése a feladónak és a címzettnek
                    //Értesítési objektum küldése a(z) ("parcelSendingNotificationForSender") topicnak
                    const notification = {
                        receiverName: requestBody.receiverName,
                        senderName: requestBody.senderName,
                        senderEmailAddress: requestBody.senderEmailAddress,
                        receiverEmailAddress: requestBody.receiverEmailAddress,
                        price: requestBody.price,
                        uniqueParcelId: parcel.uniqueParcelId,
                        receiverParcelLockerPostCode: receiverParcelLocker.location.postCode,
                        receiverParcelLockerCity: receiverParcelLocker.location.city,
                        receiverParcelLockerStreet: receiverParcelLocker.location.street,

                        senderParcelLockerPostCode: senderParcelLocker.location.postCode,
                        senderParcelLockerCity: senderParcelLocker.location.city,
                        senderParcelLockerStreet: senderParcelLocker.location.street,
                        sendingDate: currentDate(),
                        sendingTime: currentTime(),
                    };

                    producer.parcelSendingNotification(notification)
                        .then(() => {
                            console.log("Üzenet elküldve");
                        }).catch(error => {
                            console.log(error);
                        })

                    response.boxNumber = emptyBoxes[0].boxNumber;
                    response.message = "successSending";
                    res.status(200).json(response);

                }).catch(error => {
                    console.log(error);
                })

            }).catch(error => {

            })

        }).catch(error => {

        })



    }).catch(error => {

    })


}

//Csomagok lekérése az automatából, amik készen állnak az elszállításra
const getParcelsForShipping = (req, res) => {

    const senderParcelLockerId = req.params.senderParcelLockerId;
    const response = [];


    ParcelLocker.findOne({
        where: { id: senderParcelLockerId },
        include: {
            model: Parcel,
            as: "parcels",
            include: [
                {
                    model: Box,
                    as: "box"
                },
                {
                    model: ParcelLocker,
                    as: "shippingTo",
                    include: {
                        model: Address,
                        as: "location"
                    }
                },
                {
                    model: ParcelLocker,
                    as: "shippingFrom",
                    include: {
                        model: Address,
                        as: "location"
                    }
                }
            ]
        }
    }).then(parcelLocker => {
        parcelLocker.parcels.map(parcel => {

            //Csomagok, amiket el kell szállítani majd az érkezési automatához
            if (parcel.isShipped === false && parcel.isPlaced && parcel.isPickedUp === false && parcel.shippingTo.id !== senderParcelLockerId) {
                const responseObj = {
                    uniqueParcelId: parcel.uniqueParcelId,
                    boxNumber: parcel.box.boxNumber,
                    senderParcelLockerPostCode: parcel.shippingFrom.location.postCode,
                    senderParcelLockerCounty: parcel.shippingFrom.location.county,
                    senderParcelLockerCity: parcel.shippingFrom.location.city,
                    senderParcelLockerStreet: parcel.shippingFrom.location.street,
                    receiverParcelLockerPostCode: parcel.shippingTo.location.postCode,
                    receiverParcelLockerCounty: parcel.shippingTo.location.county,
                    receiverParcelLockerCity: parcel.shippingTo.location.city,
                    receiverParcelLockerStreet: parcel.shippingTo.location.street,
                };
                response.push(responseObj);
            }
            //Csomag ami már ide lett szállítva, de lejárt az átvételi dátum
            if (isPickingUpDateTimeExpired(parcel)) {
                const responseObj = {
                    uniqueParcelId: parcel.uniqueParcelId,
                    boxNumber: parcel.box.boxNumber,
                    senderParcelLockerPostCode: parcel.shippingFrom.location.postCode,
                    senderParcelLockerCounty: parcel.shippingFrom.location.county,
                    senderParcelLockerCity: parcel.shippingFrom.location.city,
                    senderParcelLockerStreet: parcel.shippingFrom.location.street,
                    receiverParcelLockerPostCode: parcel.shippingTo.location.postCode,
                    receiverParcelLockerCounty: parcel.shippingTo.location.county,
                    receiverParcelLockerCity: parcel.shippingTo.location.city,
                    receiverParcelLockerStreet: parcel.shippingTo.location.street,
                };
                response.push(responseObj);
                //Adatok módosítása
                Parcel.findOne({
                    where: { id: parcel.id },
                }).then(parcel => {
                    parcel.isPickingUpExpired = true;
                    parcel.shippingDate = null;
                    parcel.shippingTime = null;
                    return parcel.save();
                }).then(updatedParcel => {
                    if (updatedParcel) {
                        console.log("Sikeresen frissítve");
                    }
                    else {
                        console.log("Nem sikerült frissíteni");
                    }
                }).catch(error => {

                })
            }

        });
        res.status(200).json(response);

    }).catch(error => {

    })

    /*
    getReadyParcelsForShipping(senderParcelLockerId).map(parcel => {
        const responseObj = {};
        responseObj.uniqueParcelId = parcel.uniqueParcelId;
        response.price = parcel.price;

        responseObj.senderParcelLockerPostCode(parcel.shippingFrom.location.postCode);
        responseObj.senderParcelLockerCounty(parcel.shippingFrom.location.county);
        responseObj.senderParcelLockerCity(parcel.shippingFrom.location.city);
        responseObj.senderParcelLockerStreet(parcel.shippingFrom.location.street);

        responseObj.receiverParcelLockerPostCode(parcel.shippingTo.location.postCode);
        responseObj.receiverParcelLockerCounty(parcel.shippingTo.location.county);
        responseObj.receiverParcelLockerCity(parcel.shippingTo.location.city);
        responseObj.receiverParcelLockerStreet(parcel.shippingTo.location.street);

        responseObj.boxNumber(parcel.box.boxNumber);

        response.push(responseObj);
    });
    */

}


//Automata kiürítése. Elszállításra váró csomagok átkerülnek a futárhoz
//Jwt token szükséges
const emptyParcelLocker = (req, res) => {

    const requestBody = req.body;

    const response = [];


    ParcelLocker.findOne({
        where: { id: requestBody.parcelLockerId },
        include: {
            model: Parcel,
            as: "parcels",
            include: [
                {
                    model: Box,
                    as: "box"
                },
                {
                    model: ParcelLocker,
                    as: "shippingTo",
                    include: {
                        model: Address,
                        as: "location"
                    }
                },
                {
                    model: ParcelLocker,
                    as: "shippingFrom",
                    include: {
                        model: Address,
                        as: "location"
                    }
                }
            ]
        }
    }).then(parcelLocker => {
        parcelLocker.parcels.map(parcel => {

            //Csomagok, amiket el kell szállítani majd az érkezési automatához
            if (parcel.isShipped === false && parcel.isPlaced && parcel.isPickedUp === false && parcel.shippingTo.id !== senderParcelLockerId) {
                const responseObj = {
                    uniqueParcelId: parcel.uniqueParcelId,
                    boxNumber: parcel.box.boxNumber,
                    senderParcelLockerPostCode: parcel.shippingFrom.location.postCode,
                    senderParcelLockerCounty: parcel.shippingFrom.location.county,
                    senderParcelLockerCity: parcel.shippingFrom.location.city,
                    senderParcelLockerStreet: parcel.shippingFrom.location.street,
                    receiverParcelLockerPostCode: parcel.shippingTo.location.postCode,
                    receiverParcelLockerCounty: parcel.shippingTo.location.county,
                    receiverParcelLockerCity: parcel.shippingTo.location.city,
                    receiverParcelLockerStreet: parcel.shippingTo.location.street,
                };
                response.push(responseObj);
            }
            //Csomag ami már ide lett szállítva, de lejárt az átvételi dátum
            if (isPickingUpDateTimeExpired(parcel)) {
                const responseObj = {
                    uniqueParcelId: parcel.uniqueParcelId,
                    boxNumber: parcel.box.boxNumber,
                    senderParcelLockerPostCode: parcel.shippingFrom.location.postCode,
                    senderParcelLockerCounty: parcel.shippingFrom.location.county,
                    senderParcelLockerCity: parcel.shippingFrom.location.city,
                    senderParcelLockerStreet: parcel.shippingFrom.location.street,
                    receiverParcelLockerPostCode: parcel.shippingTo.location.postCode,
                    receiverParcelLockerCounty: parcel.shippingTo.location.county,
                    receiverParcelLockerCity: parcel.shippingTo.location.city,
                    receiverParcelLockerStreet: parcel.shippingTo.location.street,
                };
                response.push(responseObj);
                //Adatok módosítása
                Parcel.findOne({
                    where: { id: parcel.id },
                }).then(parcel => {
                    parcel.isPickingUpExpired = true;
                    parcel.shippingDate = null;
                    parcel.shippingTime = null;
                    return parcel.save();
                }).then(updatedParcel => {
                    if (updatedParcel) {
                        console.log("Sikeresen frissítve");
                    }
                    else {
                        console.log("Nem sikerült frissíteni");
                    }
                }).catch(error => {

                })
            }

        });
        res.status(200).json(response);

    }).catch(error => {

    })


}

//Futárnál lévő csomagok lekérése. Csak olyan csomagok, amik az adott automatához tartoznak és van nekik szabad rekesz
//Jwt token szükséges
const getParcelsForParcelLocker = (req, res) => {

    const senderParcelLockerId = req.params.senderParcelLockerId;
    const uniqueCourierId = req.params.uniqueCourierId;

    const response = [];

}

//Automata feltöltése
//Ez a kérés csak akkor van meghívva, ha a futárnak vannak csomagjai az adott automatához, és azoknak van hely
//Frontend oldalon a gomb aktív vagy inaktív
//Ezt tartalmazza az előző függvény
//Jwt token szükséges
//Visszatérés a csomagazonosítókkal és a rekesz számokkal
const fillParcelLocker = (req, res) => {

    const senderParcelLockerId = req.params.senderParcelLockerId;
    const uniqueCourierId = req.params.uniqueCourierId;

    

}

//Automatában megtalálható csomagok keresése. Ezek a csomagok készen állnak az elszállításra
//Még nincs leszállítva, el van helyezve, nincs átvéve, a csomag érkezési automatája nem ez az automata
//Azok a csomagok is átkerülnek a futárhoz, ami már ahhoz az automatához le lett szállítva,
//de az ügyfél nem vette át. Tehát lejárt az átvételi időpont
const getReadyParcelsForShipping = (senderParcelLockerId) => {

    const readyParcels = [];

    ParcelLocker.findOne({
        where: { id: senderParcelLockerId },
        include: {
            model: Parcel,
            as: "parcels",
            include: [
                {
                    model: Box,
                    as: "box"
                },
                {
                    model: ParcelLocker,
                    as: "shippingTo",
                    include: {
                        model: Address,
                        as: "location"
                    }
                },
                {
                    model: ParcelLocker,
                    as: "shippingFrom",
                    include: {
                        model: Address,
                        as: "location"
                    }
                }
            ]
        }
    }).then(parcelLocker => {
        parcelLocker.parcels.map(parcel => {

            //Csomagok, amiket el kell szállítani majd az érkezési automatához
            if (parcel.isShipped === false && parcel.isPlaced && parcel.isPickedUp === false && parcel.shippingTo.id !== senderParcelLockerId) {
                const responseObj = {
                    uniqueParcelId: parcel.uniqueParcelId,
                    boxNumber: parcel.box.boxNumber,
                    senderParcelLockerPostCode: parcel.shippingFrom.location.postCode,
                    senderParcelLockerCounty: parcel.shippingFrom.location.county,
                    senderParcelLockerCity: parcel.shippingFrom.location.city,
                    senderParcelLockerStreet: parcel.shippingFrom.location.street,
                    receiverParcelLockerPostCode: parcel.shippingTo.location.postCode,
                    receiverParcelLockerCounty: parcel.shippingTo.location.county,
                    receiverParcelLockerCity: parcel.shippingTo.location.city,
                    receiverParcelLockerStreet: parcel.shippingTo.location.street,
                };
                readyParcels.push(responseObj);
            }
            //Csomag ami már ide lett szállítva, de lejárt az átvételi dátum
            if (isPickingUpDateTimeExpired(parcel)) {
                const responseObj = {
                    uniqueParcelId: parcel.uniqueParcelId,
                    boxNumber: parcel.box.boxNumber,
                    senderParcelLockerPostCode: parcel.shippingFrom.location.postCode,
                    senderParcelLockerCounty: parcel.shippingFrom.location.county,
                    senderParcelLockerCity: parcel.shippingFrom.location.city,
                    senderParcelLockerStreet: parcel.shippingFrom.location.street,
                    receiverParcelLockerPostCode: parcel.shippingTo.location.postCode,
                    receiverParcelLockerCounty: parcel.shippingTo.location.county,
                    receiverParcelLockerCity: parcel.shippingTo.location.city,
                    receiverParcelLockerStreet: parcel.shippingTo.location.street,
                };
                readyParcels.push(responseObj);
                //Adatok módosítása
                Parcel.findOne({
                    where: { id: parcel.id },
                }).then(parcel => {
                    parcel.isPickingUpExpired = true;
                    parcel.shippingDate = null;
                    parcel.shippingTime = null;
                    return parcel.save();
                }).then(updatedParcel => {
                    if (updatedParcel) {
                        console.log("Sikeresen frissítve");
                    }
                    else {
                        console.log("Nem sikerült frissíteni");
                    }
                }).catch(error => {

                })
            }

        });

    }).catch(error => {

    })
}

//Csomag átvételi ideje lejárt?
const isPickingUpDateTimeExpired = (parcel) => {

    let result = false;

    //Ha a csomag már le van szállítva
    if (parcel.shipped && parcel.pickingUpExpirationDate !== null && parcel.pickingUpExpirationTime !== null) {

        //Ha a jelenlegi dátum és a lejárati dátum megegyezik, akkor az időpontokat kell megvizsgálni
        if (currentDate() === parcel.pickingUpExpirationDate && currentTime() > parcel.pickingUpExpirationTime) {
            result = true;
        }
        //Ha a jelenlegi dátum nagyobb, mint a lejárati dátum
        if (currentDate() > parcel.pickingUpExpirationDate) {
            result = true;
        }
    }
    return result;
}

module.exports = {
    sendParcelWithoutCode,
    getParcelsForShipping,
    emptyParcelLocker,
    getParcelsForParcelLocker,
    fillParcelLocker,
};



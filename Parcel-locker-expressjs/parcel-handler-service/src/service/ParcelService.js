const { Parcel, ParcelLocker, Box, Address } = require("../sequelize/models");
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
                    shipped: false,
                    pickedUp: false,

                    sendingDate: currentDate(),
                    sendingTime: currentTime(),
                    shippingDate: null,
                    shippingTime: null,
                    pickingUpDate: null,
                    pickingUpTime: null,
                    placed: true,
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

}

module.exports = {
    sendParcelWithoutCode,
    getParcelsForShipping,
};



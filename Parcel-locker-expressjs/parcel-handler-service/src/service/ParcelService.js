const { Parcel, ParcelLocker, Box } = require("../sequelize/models");
const initDb = require("../config/InitDatabase");
const { DATEONLY, TIME } = require("sequelize");

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

//Csomag küldése feladási kód nélkül
//Nem szükséges jwt token
const sendParcelWithoutCode = (req, res) => {

    const requestBody = req.body;
    const senderParcelLockerId = req.params.senderParcelLockerId;
    const response = {};

    //Feladási automata
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
    }).then(senderParcelLocker => {
        //Érkezési automata
        ParcelLocker.findOne({
            where: { id: requestBody.selectedParcelLockerId },
        }).then(receiverParcelLocker => {

            //A kiválasztott mérethez tartozó rekeszek
            Box.findAll({
                where: { size: requestBody.parcelSize },
            }).then(boxes => {


                //Feladási automata teli rekeszei
                const fullBoxes = [];
                for (let i = 0; i < senderParcelLocker.parcels.length; i++) {
                    fullBoxes.push(senderParcelLocker.parcels[i].box);
                }


                //Üres rekeszek keresése
                const emptyBoxes = [];

                for (let i = 0; i < boxes.length; i++) {
                    if (!fullBoxes.includes(boxes[i])) {
                        emptyBoxes.push(boxes[i]);

                    }
                }

                console.log("Üres rekeszek: " + emptyBoxes.length);

                //Itt lehetne ellenőrizni, hogy az automatában van-e hely
                //De az már megtörtént küldés előtt
                //Frontenden csak akkor enged küldeni, ha van szabad hely
                /*if (emptyBoxes === null) {
                    stringResponse.message = "parcelLockerIsFull";
                    res.status(200).json(response);
                }*/

                //Email küldése a feladónak
                //Értesítési objektum küldése a(z) ("parcelSendingNotificationForSender") topicnak
                //-------------------------------------------------------------------------------------

                //Email küldése az átvevőnek
                //Értesítési objektum küldése a(z) ("parcelSendingNotificationForReceiver") topicnak
                //-------------------------------------------------------------------------------------

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

                    sendingDate: "2023-11-30",
                    sendingTime: "14:50:34",
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

module.exports = {
    sendParcelWithoutCode,
};



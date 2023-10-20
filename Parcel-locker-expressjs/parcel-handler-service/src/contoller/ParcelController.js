const { Parcel, sequelize, Courier } = require("../sequelize/models");
const parcelService = require("../service/ParcelService");



const getParcels = async (req, res) => {

    //Adattábla létrehozása
    //sequelize.sync();


    /*
    const courier1 = Courier.create({
        uniqueCourierId: "courier001"
    });
    */

    /*
    const parcel1 = Parcel.create({
        uniqueParcelId: "parcel001"
    });
    */

    /*
    const courier1 = await Courier.findByPk(1, {
    });

    const parcel1 = Parcel.create({
        uniqueParcelId: "parcel001",
        courierId: courier1.id
    });
    */


    /*
    Parcel.create(parcel1)
        .then((parcel) => {
            console.log('Új parcel hozzáadva:', parcel.toJSON());
        })
        .catch((error) => {
            console.error('Hiba történt a parcel létrehozása során:', error);
        });*/

    /*
    const courier1 =  await Courier.findByPk(1);

    console.log("Ez a futár: " + courier1.id + "   " + courier1.uniqueCourierId);
    */

    /*
    const parcel1 = await Parcel.findByPk(1, {
        include: 'couriers',
    });

    const courier1 = await Courier.findByPk(1, {
        include: 'parcels', // Az "as" alias segítségével hivatkozunk a Parcel modelre
    });

    console.log("Ez a csomag: " + parcel1.id + "  " + parcel1.uniqueParcelId);
    console.log("Ez a futár: " + courier1.id + "  " + courier1.uniqueCourierId);
    //parcel1.setCouriers(courier1);
    //courier1.setParcels(parcel1);
    console.log("\n\n\nA futár csomagjai: " + courier1.parcels[0].uniqueParcelId);
    console.log("A csomag futára: " + parcel1.getCouriers.uniqueCourierId);
    */

    const parcel = {
        id: 5,
        parcelId: "lfjfdj343",
        parcelLocker: "Várpalota"
    }


    res.send(parcel);
    res.status(200);

}

const sendParcelWithoutCode = (req, res) => {

}

module.exports = {
    sendParcelWithoutCode,
};
const { Parcel, sequelize } = require("../sequelize/models");

const getParcels = (req, res) => {

    //Adattábla létrehozása
    //sequelize.sync();

    const parcel1 = {
        id: 5,
        uniqueParcelId: "aa1",
        isShipped: true
    };

    Parcel.create(parcel1)
        .then((parcel) => {
            console.log('Új parcel hozzáadva:', parcel.toJSON());
        })
        .catch((error) => {
            console.error('Hiba történt a parcel létrehozása során:', error);
        });
    res.send("ezek a csomagok");
}

const getParcel = (req, res) => {
    res.send("ez a csomag");
}

module.exports = {
    getParcels,
    getParcel
};
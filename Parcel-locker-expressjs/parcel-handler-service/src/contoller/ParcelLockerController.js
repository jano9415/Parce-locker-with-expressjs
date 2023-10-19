const parcelLockerService = require("../service/ParcelLockerService");

const getParcelLocker = (req, res) => {
    res.send("Ez a parcel locker");
}

module.exports = {
    getParcelLocker,
};
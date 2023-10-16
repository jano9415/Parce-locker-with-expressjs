const {sq} = require("../config/DbConfig");
const {DataTypes} = require("sequelize");

const Parcel = sq.define("parcel", {
    uniqueParcelId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false
    }
});

Parcel.sync().then(() => {
    console.log("User Model synced");
  });


module.exports = Parcel;

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ParcelLocker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      //Kapcsolat a Parcel és a Parcel locker között. Éppen melyik automatában van a csomag
      ParcelLocker.hasMany(models.Parcel, {
        foreignKey: "parcelLockerId",
        as: "parcels"
      })

      //Kapcsolat a Parcel és a Parcel locker között. Feladási automata
      ParcelLocker.hasMany(models.Parcel, {
        foreignKey: "shippingFromParcelLockerId",
        as: "shippingFromParcels"
      })

      //Kapcsolat a Parcel és a Parcel locker között. Érkezési automata
      ParcelLocker.hasMany(models.Parcel, {
        foreignKey: "shippingToParcelLockerId",
        as: "shippingToParcels"
      })

      //Kapcsolat a Parcel locker és az Address között
      ParcelLocker.belongsTo(models.Address, {
        foreignKey: "addressId",
        as: "location"
      })

      //Kapcsolat a Parcel locker és a Store között
      ParcelLocker.belongsTo(models.Store, {
        foreignKey: "storeId",
        as: "store"
      })
    }
  }
  ParcelLocker.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    amountOfBoxes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amountOfSmallBoxes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amountOfMediumBoxes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amountOfLargeBoxes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'ParcelLocker',
  });
  return ParcelLocker;
};
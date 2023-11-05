'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Parcel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here


      /*
      //Parcel_during_shipping kapcsolótábla
      //Kapcsolat a Parcel és a Courier között
      Parcel.belongsTo(models.Courier, {
        through: "parcel_during_shipping",
        foreignKey: "parcelId",
        otherKey: "courierId",
        as: "courier"
      });
      */

      //Kapcsolat a Parcel és a Parcel locker között. Éppen melyik automatában van a csomag
      Parcel.belongsTo(models.ParcelLocker, {
        foreignKey: "parcelLockerId",
        as: "parcelLocker"
      })

      //Kapcsolat a Parcel és a Courier között
      Parcel.belongsTo(models.Courier, {
        foreignKey: "courierId",
        as: "courier"
      });

      //Kapcsolat a Parcel és a Store között
      //Many-to-one kapcsolat
      Parcel.belongsTo(models.Store, {
        foreignKey: "storeId",
        as: "store"
      })

      //Kapcsolat a Parcel és a User között
      Parcel.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user"
      })

      //Kapcsolat a Parcel és a Parcel locker között. Feladási automata
      Parcel.belongsTo(models.ParcelLocker, {
        foreignKey: "shippingFromParcelLockerId",
        as: "shippingFrom"
      })

      //Kapcsolat a Parcel és a Parcel locker között. Érkezési automata
      Parcel.belongsTo(models.ParcelLocker, {
        foreignKey: "shippingToParcelLockerId",
        as: "shippingTo"
      })

      //Kapcsolat a Parcel és a Box között
      Parcel.belongsTo(models.Box, {
        foreignKey: "boxId",
        as: "box"
      })

    }
  }
  Parcel.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    uniqueParcelId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    receiverName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    receiverEmailAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    senderName: {
      type: DataTypes.STRING,
    },
    senderEmailAddress: {
      type: DataTypes.STRING,
    },
    isShipped: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isPickedUp: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    sendingDate: {
      type: DataTypes.DATEONLY,
    },
    sendingTime: {
      type: DataTypes.TIME,
    },
    pickingUpDate: {
      type: DataTypes.DATEONLY,
    },
    pickingUpTime: {
      type: DataTypes.TIME,
    },
    shippingDate: {
      type: DataTypes.DATEONLY,
    },
    shippingTime: {
      type: DataTypes.TIME,
    },
    isPlaced: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    pickingUpCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sendingCode: {
      type: DataTypes.STRING,
    },
    pickingUpExpirationDate: {
      type: DataTypes.DATEONLY,
    },
    pickingUpExpirationTime: {
      type: DataTypes.TIME,
    },
    isPickingUpExpired: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    sendingExpirationDate: {
      type: DataTypes.DATEONLY,
    },
    sendingExpirationTime: {
      type: DataTypes.TIME,
    },
    isSendingExpired: {
      type: DataTypes.BOOLEAN,
    },
    pickingUpDateFromParcelLockerByCourier: {
      type: DataTypes.DATEONLY,
    },
    pickingUpTimeFromParcelLockerByCourier: {
      type: DataTypes.TIME,
    },
    handingDateToFirstStoreByCourier: {
      type: DataTypes.DATEONLY,
    },
    handingTimeToFirstStoreByCourier: {
      type: DataTypes.TIME,
    },
    pickingUpDateFromSecondStoreByCourier: {
      type: DataTypes.DATEONLY,
    },
    pickingUpTimeFromSecondStoreByCourier: {
      type: DataTypes.TIME,
    },



  }, {
    sequelize,
    modelName: 'Parcel',
  });
  return Parcel;
};
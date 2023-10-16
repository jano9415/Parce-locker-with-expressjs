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
      allowNull: false
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
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      //Kapcsolat a Parcel locker és az Address között
      Address.hasOne(models.ParcelLocker, {
        foreignKey: "addressId",
        as: "parcelLocker"
      })

      //Kapcsolat a Store és az Address között
      Address.hasOne(models.Store, {
        foreignKey: "addressId",
        as: "store"
      })
    }
  }
  Address.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    } ,
    postCode: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    county: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};
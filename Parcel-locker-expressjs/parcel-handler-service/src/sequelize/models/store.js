'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      //Kapcsolat a Courier és a Store között
      Store.hasMany(models.Parcel, {
        foreignKey: "storeId",
        as: "parcels"
      })

      //Kapcsolat a Parcel locker és a Store között
      Store.hasMany(models.ParcelLocker, {
        foreignKey: "storeId",
        as: "parcelLockers"
      })

      //Kapcsolat a Store és az Address között
      Store.hasOne(models.Address, {
        foreignKey: "addressId",
        as: "location"
      })
    }
  }
  Store.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    } ,
  }, {
    sequelize,
    modelName: 'Store',
  });
  return Store;
};
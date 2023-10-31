'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Courier extends Model {
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
      Courier.belongsToMany(models.Parcel, {
        through: "parcel_during_shipping",
        foreignKey: "courierId",
        otherKey: "parcelId",
        as: "parcels"
      })
      */
      
      //Kapcsolat a Parcel és a Courier között
      //One-to-many kapcsolat
      Courier.hasMany(models.Parcel, {
        foreignKey: "courierId",
        as: "parcels"
      });

      //Kapcsolat a Courier és a Store között
      //Many-to-one kapcsolat
      Courier.belongsTo(models.Store, {
        foreignKey: "storeId",
        as: "area"
      })
      
    }
  }
  Courier.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    uniqueCourierId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Courier',
  });
  return Courier;
};
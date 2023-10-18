'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Box extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      //Kapcsolat a Parcel és a Box között
      Box.hasMany(models.Parcel, {
        foreignKey: "boxId",
        as: "parcels"
      })
    }
  }
  Box.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    } ,
    maxWidth: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    maxLength: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    maxHeight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    maxWeight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false
    },
    boxNumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Box',
  });
  return Box;
};
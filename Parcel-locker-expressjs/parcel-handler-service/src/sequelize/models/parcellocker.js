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
    }
  }
  ParcelLocker.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    } ,
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
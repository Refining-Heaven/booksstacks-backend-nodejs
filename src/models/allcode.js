'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Allcode.hasMany(models.User, {foreignKey: 'role', as: 'roleData'})
      Allcode.hasMany(models.Book, {foreignKey: 'status', as: 'statusData'})
      Allcode.hasMany(models.Book, {foreignKey: 'version', as: 'versionData'})
      Allcode.hasMany(models.Book, {foreignKey: 'language', as: 'languageData'})
    }
  }
  Allcode.init({
    keyMap: DataTypes.STRING,
    type: DataTypes.STRING,
    valueEn: DataTypes.STRING,
    valueVi: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Allcode',
  });
  return Allcode;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kind extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Kind.hasMany(models.Book, {foreignKey: 'kind', as: 'kindData'})
    }
  }
  Kind.init({
    valueEn: DataTypes.STRING,
    valueVi: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Kind',
  });
  return Kind;
};
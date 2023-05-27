'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init({
    bookName: DataTypes.STRING,
    anotherName: DataTypes.STRING,
    author: DataTypes.STRING,
    intro: DataTypes.TEXT('long'),
    uploaderId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    kind: DataTypes.INTEGER,
    version: DataTypes.STRING,
    language: DataTypes.STRING,
    coverImage: DataTypes.BLOB('long'),
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};
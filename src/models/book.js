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
      Book.belongsTo(models.Allcode, {foreignKey: 'status', targetKey:'keyMap', as: 'statusData'}),
      Book.belongsTo(models.Allcode, {foreignKey: 'version', targetKey:'keyMap', as: 'versionData'}),
      Book.belongsTo(models.Allcode, {foreignKey: 'language', targetKey:'keyMap', as: 'languageData'})
      Book.belongsTo(models.Kind, {foreignKey: 'kind', targetKey:'id', as: 'kindData'})
      Book.belongsTo(models.User, {foreignKey: 'uploaderId', targetKey:'id', as: 'uploader'})
      Book.hasMany(models.Book_Genre, {foreignKey: 'bookId', as: 'bookData'})
      Book.hasMany(models.Chapter, {foreignKey: 'bookId', as: 'chapterBookData'})
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
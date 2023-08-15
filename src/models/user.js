'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Allcode, {foreignKey: 'role', targetKey:'keyMap', as: 'roleData'}),
      User.hasMany(models.Book, {foreignKey: 'uploaderId', as: 'uploader'}),
      User.hasMany(models.Comment, {foreignKey: 'userId', as: 'userCommentData'}),
      User.hasMany(models.Reply, {foreignKey: 'userId', as: 'userReplyData'})
    }
  }
  User.init({
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.BLOB('long'),
    role: DataTypes.STRING,
    banned: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
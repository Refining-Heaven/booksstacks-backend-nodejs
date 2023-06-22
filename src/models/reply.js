'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reply.belongsTo(models.User, {foreignKey: 'userId', targetKey:'id', as: 'userReplyData'}),
      Reply.belongsTo(models.Comment, {foreignKey: 'commentId', targetKey:'id', as: 'replyData'})
    }
  }
  Reply.init({
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Reply',
  });
  return Reply;
};
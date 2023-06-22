'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, {foreignKey: 'userId', targetKey:'id', as: 'userCommentData'})
      Comment.hasMany(models.Reply, {foreignKey: 'commentId', as: 'replyData'})
    }
  }
  Comment.init({
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    chapterId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookId: {
        allowNull: true,
        type: Sequelize.STRING
      },
      chapterId: {
        allowNull: true,
        type: Sequelize.STRING
      },
      commentId: {
        allowNull: true,
        type: Sequelize.STRING
      },
      replyId: {
        allowNull: true,
        type: Sequelize.STRING
      },
      reason: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reports');
  }
};
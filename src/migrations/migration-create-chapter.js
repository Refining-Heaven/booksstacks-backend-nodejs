'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('chapters', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			chapterNumber: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			chapterTitle: {
				allowNull: true,
				type: Sequelize.STRING,
			},
			chapterContent: {
				allowNull: false,
				type: Sequelize.TEXT('long'),
			},
			bookId: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('chapters');
	},
};

"use strict";
/** @type {import('sequelize-cli').Migration, } */
module.exports = {
	async up(queryInterface, Sequelize) {
		queryInterface.changeColumn("users", "email", {
			type: Sequelize.DataTypes.STRING(255),
			allowNull: true,
			unique: "email",
		});
		queryInterface.changeColumn("users", "username", {
			type: Sequelize.DataTypes.STRING(255),
			allowNull: true,
		});
		queryInterface.changeColumn("users", "password", {
			type: Sequelize.DataTypes.STRING(255),
			allowNull: true,
		});
		queryInterface.changeColumn("users", "refreshToken", {
			type: Sequelize.DataTypes.STRING(255),
			allowNull: true,
		});
		queryInterface.changeColumn("users", "confirmed", {
			type: Sequelize.DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: 0,
		});
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		queryInterface.changeColumn("users", "email", {
			type: Sequelize.DataTypes.STRING(255),
			allowNull: false,
			unique: "email",
		});
		queryInterface.changeColumn("users", "username", {
			type: Sequelize.DataTypes.STRING(255),
			allowNull: false,
		});
		queryInterface.changeColumn("users", "password", {
			type: Sequelize.DataTypes.STRING(255),
			allowNull: false,
		});
		queryInterface.changeColumn("users", "refreshToken", {
			type: Sequelize.DataTypes.STRING(255),
			allowNull: false,
		});
		queryInterface.changeColumn("users", "confirmed", {
			type: Sequelize.DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: 0,
		});
	},
};

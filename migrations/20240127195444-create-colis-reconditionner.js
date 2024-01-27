'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Colis_reconditionners', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      colis_id: {
        type: Sequelize.INTEGER
      },
      condition_bag_id: {
        type: Sequelize.INTEGER
      },
      repackaged: {
        type: Sequelize.INTEGER
      },
      loss: {
        type: Sequelize.INTEGER
      },
      sweepy: {
        type: Sequelize.INTEGER
      },
      source: {
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
    await queryInterface.dropTable('Colis_reconditionners');
  }
};
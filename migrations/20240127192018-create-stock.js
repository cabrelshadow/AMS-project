'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Stocks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      colis_id: {
        type: Sequelize.INTEGER
      },
      magasin_id: {
        type: Sequelize.INTEGER
      },
      torn_leaky_vessel: {
        type: Sequelize.INTEGER
      },
      moudly_from_vessel: {
        type: Sequelize.INTEGER
      },
      moudly_from_wh: {
        type: Sequelize.INTEGER
      },
      torn_leaky_from_wh: {
        type: Sequelize.INTEGER
      },
      wet: {
        type: Sequelize.INTEGER
      },
      total: {
        type: Sequelize.INTEGER
      },
      condition_bags: {
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
    await queryInterface.dropTable('Stocks');
  }
};
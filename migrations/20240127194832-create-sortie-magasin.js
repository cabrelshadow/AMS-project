'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sortie_magasins', {
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
      bon_livraison_id: {
        type: Sequelize.INTEGER
      },
      delievery_qty: {
        type: Sequelize.INTEGER
      },
      stock_id: {
        type: Sequelize.INTEGER
      },
      swb: {
        type: Sequelize.STRING
      },
      mtn - t: {
        type: Sequelize.STRING
      },
      do: {
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
    await queryInterface.dropTable('Sortie_magasins');
  }
};
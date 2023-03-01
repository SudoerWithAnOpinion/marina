'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('materials', {
      materialId: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      vendor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      materialType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      materialDiameter: {
        type: Sequelize.STRING,
        allowNull: false
      },
      initialWeight: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      materialWeight: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      color: {
        type: Sequelize.STRING(6),
        allowNull: false
      },
      openedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      depletedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      lastRenewalAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('materials');
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('material_usage', {
        materialUsageId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        materialId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'materials',
            key: 'materialId',
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT',
        },
        weightUsed: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      });
  },

  async down (queryInterface, Sequelize) {
     return queryInterface.dropTable('material_usage')
  }
};

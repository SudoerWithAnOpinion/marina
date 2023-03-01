'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface
      .addColumn('printers', 'connectionType', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'none'
      })
      .then(() => {
        return queryInterface.changeColumn('printers', 'address', {
          type: Sequelize.STRING,
          allowNull: true
        });
      });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropColumn('printers', 'connectionType').then(() => {
      return queryInterface.changeColumn('printers', 'address', {
        type: Sequelize.STRING,
        allowNull: false
      });
    });
  }
};

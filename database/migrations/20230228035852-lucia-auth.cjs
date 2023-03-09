'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface
      .createTable('users', {
        id: {
          type: Sequelize.STRING,
          primaryKey: true
        },
        username: {
          type: Sequelize.STRING,
          allowNull: true,
          unique: true
        },
        role: {
          type: Sequelize.TEXT,
          allowNull: true,
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
      })
      .then(() => {
        return Promise.all([
          queryInterface.createTable('keys', {
            id: {
              type: Sequelize.STRING,
              primaryKey: true
            },
            hashed_password: {
              type: Sequelize.STRING,
              allowNull: true
            },
            primary: {
              type: Sequelize.BOOLEAN,
              allowNull: false,
              defaultValue: false
            },
            user_id: {
              type: Sequelize.STRING,
              references: {
                model: { tableName: 'users' },
                key: 'id'
              },
              onUpdate: 'CASCADE',
              onDelete: 'CASCADE'
            },
            expires: {
              type: Sequelize.INTEGER,
              allowNull: true
            }
          }),
          queryInterface.createTable('session', {
            id: {
              type: Sequelize.STRING,
              primaryKey: true
            },
            active_expires: {
              type: Sequelize.INTEGER,
              allowNull: false
            },
            idle_expires: {
              type: Sequelize.INTEGER,
              allowNull: false
            },
            user_id: {
              type: Sequelize.STRING,
              allowNull: false,
              references: {
                model: { tableName: 'users' },
                key: 'id'
              },
              onUpdate: 'CASCADE',
              onDelete: 'CASCADE'
            }
          })
        ]);
      });
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.dropTable('keys'),
      queryInterface.dropTable('session')
    ]).then(() => {
      return queryInterface.dropTable('users');
    });
  }
};

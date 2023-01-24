'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('printers', {
      printerId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      volume: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }).then(() => {
      return queryInterface.createTable('jobs', {
        jobId: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
        },
        printerId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'printers',
            key: 'printerId',
          },
        },
        jobName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        slicer: {
          type: Sequelize.STRING,
          allowNull: false,

        },
        filamentDiameter: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        nozzleDiameter: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        layerHeight: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      });
      }).then(() => {
        return queryInterface.createTable('job_events', {
          eventId: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
          },
          jobId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'jobs',
              key: 'jobId',
            },
          },
          printerId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'printers',
              key: 'printerId',
            },
          },
          eventType: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
        });
      });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('job_events').then(() => {
      return queryInterface.dropTable('jobs');
    }).then(() => {
      return queryInterface.dropTable('printers');
    });
  }
};

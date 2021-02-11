'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tracks', {
      id: {
        type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false
      },
      requestId: {
        allowNull: false,
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'requests',
          key: 'id',
        },
      },
      trackNber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      track_status: {
        type: Sequelize.ENUM,
        values: ['Pending', 'Started', 'Delived'],
        defaultValue: 'Pending'
      },
      track_startedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      track_delivedAt: {
        allowNull: true,
        type: Sequelize.DATE
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tracks');
  }
};
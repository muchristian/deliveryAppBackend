'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('shops', {
      uuid: {
        type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false
      },
      apiFeatureId: {
        allowNull: false,
        type: Sequelize.UUID,
        onUpdate: 'CASCADE',
        references: {
          model: 'api_features',
          key: 'uuid',
        },
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      logo_mimetype: {
        type: Sequelize.STRING,
        allowNull: true
      },
      logo_fileName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      logo: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      apiKey: {
        type: Sequelize.STRING,
        allowNull: false
      },
      host: {
        type: Sequelize.STRING,
        allowNull: false
      },
      countApiUsage: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      isActive: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      api_createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdBy: {
        allowNull: false,
        type: Sequelize.UUID
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
    await queryInterface.dropTable('shops');
  }
};
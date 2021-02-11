'use strict';

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      uuid: {
        type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.ENUM,
        values: ['ADMIN', 'CUSTOMER'],
        defaultValue: 'CUSTOMER'
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true
      },
      avatar_mimetype: {
        type: Sequelize.STRING,
        allowNull: true
      },
      avatar_fileName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      avatar: {
        type: Sequelize.TEXT,
        allowNull: true
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
    await queryInterface.dropTable('users');
  }
};

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('requests', {
      id: {
        type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false
      },
      driverId: {
        allowNull: true,
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'drivers',
          key: 'id',
        },
      },
      customerFname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      customerLname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      customerEmail: {
        type: Sequelize.STRING,
        allowNull: false
      },
      customerPhoneNber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      shippingAddress: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addIndex('requests', ['customerFname', 'customerLname', 'customerEmail', 'customerPhoneNber']);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('requests');
  }
};
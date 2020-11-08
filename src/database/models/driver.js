module.exports = (sequelize, DataTypes) => {
  const driver = sequelize.define('driver', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'driver',
  });
  driver.associate = (models) => {
    driver.hasMany(models.deliver_request, {
      foreignKey: 'driverId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  }
  return driver;
};
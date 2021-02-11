module.exports = (sequelize, DataTypes) => {
  const driver = sequelize.define('driver', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    idNumber: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.TEXT,
    role: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'driver',
  });
  driver.associate = (models) => {
    driver.hasMany(models.request, {
      foreignKey: 'driverId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    driver.hasOne(models.vehicle, {
      foreignKey: 'driverId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  }
  return driver;
};
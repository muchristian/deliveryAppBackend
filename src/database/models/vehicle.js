module.exports = (sequelize, DataTypes) => {
  const vehicle = sequelize.define('vehicle', {
    driverId: DataTypes.INTEGER,
      vehicleType: DataTypes.STRING,
      plateNber: DataTypes.STRING,
      yellowCard: DataTypes.STRING,
      documents: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'vehicle',
  });
  vehicle.associate = (models) => {
    vehicle.belongsTo(models.driver, {
      foreignKey: 'driverId'
    })
    vehicle.hasMany(models.document, {
      foreignKey: 'vehicleId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  }
  return vehicle;
};
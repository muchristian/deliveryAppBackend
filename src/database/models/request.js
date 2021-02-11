module.exports = (sequelize, DataTypes) => {
  const request = sequelize.define('request', {
    driverId: DataTypes.INTEGER,
    customerFname: DataTypes.STRING,
    customerLname: DataTypes.STRING,
    customerEmail: DataTypes.STRING,
      customerPhoneNber: DataTypes.STRING,
      shippingAddress: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'request',
  });
  request.associate = (models) => {
  request.belongsTo(models.driver, {
    foreignKey: 'driverId',
  })
  request.hasOne(models.request_detail, {
    foreignKey: 'requestId',
      onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
  });
  request.hasOne(models.track, {
    as: 'track',
    foreignKey: 'requestId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
}
  return request;
};
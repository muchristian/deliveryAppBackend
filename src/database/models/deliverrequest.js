module.exports = (sequelize, DataTypes) => {
  const deliver_request = sequelize.define('deliver_request', {
    sender: DataTypes.INTEGER,
    isApproved: DataTypes.INTEGER,
    driverId: DataTypes.INTEGER,
    mode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'deliver_request',
  });
  deliver_request.associate = (models) => {
  deliver_request.belongsTo(models.user, {
    foreignKey: 'sender'
  });
  deliver_request.belongsTo(models.driver, {
    foreignKey: 'driverId',
  })
  deliver_request.hasMany(models.prod_to_deliver, {
      foreignKey: 'deliverReqId',
      onDelete: 'CASCADE'
  });
  deliver_request.hasMany(models.prod_receiver, {
    foreignKey: 'deliverReqId',
    onDelete: 'CASCADE'
  });
}
  return deliver_request;
};
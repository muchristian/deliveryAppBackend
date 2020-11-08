module.exports = (sequelize, DataTypes) => {
  const prod_receiver = sequelize.define('prod_receiver', {
    deliverReqId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'prod_receiver',
  });
  prod_receiver.associate = (models) => {
    prod_receiver.belongsTo(models.deliver_request, {
    foreignKey: 'deliverReqId',
    onDelete: 'CASCADE'
  });
}
  return prod_receiver;
};
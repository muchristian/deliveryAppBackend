module.exports = (sequelize, DataTypes) => {
  const prod_to_deliver = sequelize.define('prod_to_deliver', {
    deliverReqId: DataTypes.INTEGER,
    prod_name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    productImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'prod_to_deliver',
  });
  prod_to_deliver.associate = (models) => {
    prod_to_deliver.belongsTo(models.deliver_request, {
    foreignKey: 'deliverReqId',
    onDelete: 'CASCADE'
  });
}
  return prod_to_deliver;
};
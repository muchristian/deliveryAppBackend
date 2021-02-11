'use strict';
module.exports = (sequelize, DataTypes) => {
  const request_detail = sequelize.define('request_detail', {
    requestId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      sku: DataTypes.STRING,
      price: DataTypes.STRING,
      quantity: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'request_detail',
  });
  request_detail.associate = (models) => {
  request_detail.belongsTo(models.product, {
    foreignKey: 'productId',
  })
  request_detail.belongsTo(models.request, {
      foreignKey: 'requestId'
  });
}
  return request_detail;
};
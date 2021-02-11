module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    sellerId: DataTypes.INTEGER,
    prod_name: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    thumbnail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'product',
  });
  product.associate = (models) => {
    product.belongsTo(models.seller, {
    foreignKey: 'sellerId'
  });
  product.hasOne(models.request_detail, {
    foreignKey: 'productId',
    onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
});
}
  return product;
};
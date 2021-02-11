module.exports = (sequelize, DataTypes) => {
  const shop = sequelize.define('shop', {
    uuid: DataTypes.UUID,
    apiFeatureId: DataTypes.UUID,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    apiKey: DataTypes.STRING,
    host: DataTypes.STRING,
    countApiUsage: DataTypes.INTEGER,
    api_createdAt: DataTypes.DATE,
    createdBy: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'shop',
  });
  shop.associate = (models) => {
    shop.belongsTo(models.api_feature, {
      foreignKey: 'apiFeatureId'
    });
    
  }
  return shop;
};
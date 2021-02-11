module.exports = (sequelize, DataTypes) => {
  const api_feature = sequelize.define('api_feature', {
    uuid: DataTypes.UUID,
    feature: DataTypes.STRING,
    maxUsage: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'api_feature',
  });
  api_feature.associate = (models) => {
    api_feature.hasMany(models.shop, {
      foreignKey: 'apiFeatureId',
      onUpdate: 'CASCADE'
    })
  }
  return api_feature;
};
module.exports = (sequelize, DataTypes) => {
  const seller = sequelize.define('seller', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'seller',
  });
  seller.associate = (models) => {
    seller.hasMany(models.product, {
      foreignKey: 'sellerId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  }
  return seller;
};
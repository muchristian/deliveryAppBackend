module.exports = (sequelize, DataTypes) => {
    const document = sequelize.define('document', {
      vehicleId: DataTypes.INTEGER,
      document_mimetype: DataTypes.STRING,
      document_fileName: DataTypes.STRING,
      document: DataTypes.STRING
    }, {
      sequelize,
      modelName: 'document',
    });
    document.associate = (models) => {
      document.belongsTo(models.vehicle, {
        foreignKey: 'vehicleId'
      })
    }
    return document;
  };
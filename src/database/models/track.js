module.exports = (sequelize, DataTypes) => {
  const track = sequelize.define('track', {
    requestId: DataTypes.INTEGER,
    trackNber: DataTypes.STRING,
    track_status: DataTypes.ENUM(
      'Pending', 'Started', 'Delived'
      ),
    track_startedAt: DataTypes.DATE,
    track_delivedAt: DataTypes.DATE,
    lat: DataTypes.STRING,
    long: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'track',
  });
  track.associate = (models) => {
    track.belongsTo(models.request, {
      as: 'request',
    foreignKey: 'requestId'
  });
}
  return track;
};
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    avatar: DataTypes.TEXT,
    role: DataTypes.ENUM(
      'ADMIN', 
      'CUSTOMER'
      ),
  }, {
    sequelize,
    modelName: 'user',
  });
  user.associate = (models) => {
  }
  return user;
};

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'Id'
    },

    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'Email'
    },

    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'Password'
    },

    dedicatedSchema: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'DedicatedSchema'
    }
  }, {
      freezeTableName: true,
      tableName: 'Users',
      createdAt: false,
      updatedAt: false
    })
  // User.changeSchema = schema => User.schema(schema)
  User.changeSchema = schema => User
  return User
}

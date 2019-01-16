module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'Id'
    },

    description: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'Description'
    },

    done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
      field: 'Done'
    },

    taskTypeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'TaskTypeId'
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'UserId'
    }
  }, {
      freezeTableName: true,
      tableName: 'Tasks',
      createdAt: false,
      updatedAt: false
    })
  Task.changeSchema = schema => Task.schema(schema, {
    schemaDelimiter: "`.`"
  })
  Task.associate = models => {
    Task.belongsTo(models.TaskType, {
      as: 'taskType',
      foreignKey: 'taskTypeId'
    })
  }


  return Task
}

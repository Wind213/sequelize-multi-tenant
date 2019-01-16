const path = require('path')
const fs = require('fs')
const Sequelize = require('veirryau-sequelize')

const modelsFolder = path.join(__dirname, '../models')
const models = {}

module.exports = () => {
  const sequelize = (schema = 'shared') => new Sequelize({
    database: schema,
    username: 'username',
    password: 'password',
    dialect: 'mysql',
    host: "localhost",
    port: 3306,
  })


  fs.readdirSync(modelsFolder).forEach(modelPath => {
    modelPath = path.join(modelsFolder, modelPath)

    let model = require(modelPath)
    const database = sequelize()
    model = database.import(modelPath)
    model = model.changeSchema('shared')
    models[model.name] = model
  })

  Object.values(models)
    .filter(m => m.associate)
    .forEach(m => m.associate(models))

  return (req, res, next) => {
    req.models = models
    req.changeSchema = schema => {
      Object.keys(req.models)
        .forEach(modelName => {
          const model = req.models[modelName]
          req.models[modelName] = model.changeSchema(schema)
        })
    }

    next()
  }
}

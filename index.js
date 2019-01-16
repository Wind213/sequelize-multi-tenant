const express = require('express')
const sequelizeMiddleware = require('./middlewares/sequelize')
const authMiddleware = require('./middlewares/auth')
const bodyParser = require('body-parser')

const app = express()
app.use(sequelizeMiddleware())
app.use(authMiddleware)
app.use(bodyParser.json())

app.get('/tasks', async (req, res, next) => {
  const { user } = req
  const { Task, TaskType } = req.models

  try {
    const tasks = await Task.findAll({
      where: { userId: user.id },
      include: {
        model: TaskType,
        required: true,
        as: 'taskType'
      },
    })

    res.json(tasks)
  } catch (err) {
    next(err)
  }
})

app.post('/tasks', async (req, res, next) => {
  const { user, body } = req
  
  const { Task } = req.models

  try {
    const tasks = await Task.create({
      description: body.description,
      done: body.done,
      taskTypeId: body.taskTypeId,
      userId: user.id,
    })

    res.json(tasks)
  } catch (err) {
    next(err)
  }
})

app.put('/tasks/:id', async (req, res, next) => {
  const { user, body, params } = req
  const transaction = await sequelizeMiddleware().sequelize.transaction()
  
  const { Task } = req.models

  try {
    const tasks = await Task.update({
      description: body.description,
      done: body.done,
      taskTypeId: body.taskTypeId,
      userId: user.id,
    }, {
      where: {
        id: params.id
      },
      transaction
    })
    transaction.rollback()

    res.json(tasks)
  } catch (err) {
    next(err)
  }
})

app.listen(9090, () => {
  console.log('data-isolation-example running on port 9090')
})

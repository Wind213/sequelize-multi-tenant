module.exports = async (req, res, next) => {
  const { User } = req.models

  let { authorization = '' } = req.headers
  authorization = authorization ? JSON.parse(authorization) : {}

  // authorization = authorization.replace('Basic ', '')
  // authorization = Buffer.from(authorization, 'base64')
  // authorization = authorization.toString('ascii')

  try {
    const user = await User.findOne({ where: { email: authorization.email }, raw: true })

    if (!user || user.password !== authorization.password) {
      return res.status(403).json({})
    }

    req.user = user

    req.changeSchema(user.dedicatedSchema)

    next()
  } catch (err) {
    next(err)
  }
}

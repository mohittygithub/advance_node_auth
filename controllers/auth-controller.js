const User = require('../models/User.js')
const ErrorResponse = require('../utils/error-response')

exports.register = async (req, res, next) => {
  const { name, email, password } = req.body

  try {
    const user = await User.create({ name, email, password })
    //res.status(201).json({ success: true, user })
    sendToken(user, 201, res)
  } catch (error) {
    //res.status(500).json({ success: false, error: error.message });
    next(error)
  }
}

exports.login = async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    // res
    //   .status(400)
    //   .json({ success: false, error: 'Please provide email and password' })
    next(new ErrorResponse('Please provide email and password', 400))
  }

  try {
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      // res.status(404).json({ success: false, error: 'Invalid Credentials' })
      next(new ErrorResponse('Invalid Credentials', 401))
    }

    const isMatch = await user.matchPasswords(password)
    if (!isMatch) {
      //res.status(404).json({ success: false, error: 'Invalid Credentials' })
      next(new ErrorResponse('Invalid Credentials', 401))
    }

    //res.status(201).json({ success: true, token: 'kdjfjd' })
    sendToken(user, 201, res)
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body
  const user = await User.findOne({ email })

  try {
    if (!user) {
      return next(new ErrorResponse('Email could not be sent', 401))
    }

    const resetToken = user.getResetPasswordToken()

    await user.save()

    const resetUrl = `http://localhost:4000/reset-password/${resetToken}`

    const message = `
      <h1>You have requested a password reset</h1>
      <p>Click this link to reset your password</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `
  } catch (error) {}
}

exports.resetPassword = (req, res, next) => {
  res.send('reset password route')
}

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken()
  res.status(statusCode).json({ success: true, token })
}

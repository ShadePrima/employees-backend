const { prisma } = require('../prisma/prisma-client')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/**
 *
 * @route POST /api/user/login
 * @desc login
 * @access Public
 */

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      message: 'Please fill in the required fields',
    })
  }

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  })

  const isPasswordCorrect =
    user && (await bcrypt.compare(password, user.password))

  if (user && isPasswordCorrect) {
    res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.name,
    })
  } else {
    return res.status(400).json({
      message: 'Login or password entered incorrectly',
    })
  }
}

/**
 *
 * @route POST /api/user/register
 * @desc register
 * @access Public
 */

const register = async (req, res) => {
  const { email, password, name } = req.body

  if (!email || !password || !name) {
    return res.status(400).json({
      message: 'Fill the required fields',
    })
  }

  const registeredUser = await prisma.user.findFirst({
    where: {
      email,
    },
  })

  if (registeredUser) {
    return res.status(400).json({
      message: 'A user with this email already exists',
    })
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  })

  const secret = process.env.JWT_SECRET

  if (user && secret) {
    res.status(201).json({
      id: user.id,
      email: user.email,
      name,
      toke: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' }),
    })
  } else {
    return res.status(400).json({
      message: 'Could not create user',
    })
  }
}

const current = async (req, res) => {
  res.send('current')
}

module.exports = {
  login,
  register,
  current,
}
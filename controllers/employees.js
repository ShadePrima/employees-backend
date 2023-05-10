const { prisma } = require('../prisma/prisma-client')

/**
 *
 * @route GET/api/employees
 * @desc Gettin all employees
 * @access Privat
 */

const all = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany()

    res.status(200).json(employees)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Could not obtain employee',
    })
  }
}

/**
 *
 * @route POST /api/employees/add
 * @desc Add employee
 * @access Privat
 */

const add = async (req, res) => {
  try {
    const data = req.body

    if (!data.firstName || !data.lastName || !data.address || !data.age) {
      return res.status(400).json({
        message: 'All fields are required',
      })
    }

    const employee = await prisma.employee.create({
      data: {
        ...data,
        userId: req.user.id,
      },
    })

    return res.status(201).json(employee)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Something went wrong',
    })
  }
}

module.exports = {
  all,
  add,
}

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

/**
 *
 * @route POST /api/employees/remove
 * @desc delete employee
 * @access Privat
 */

const remove = async (req, res) => {
  const { id } = req.params

  try {
    await prisma.employee.delete({
      where: {
        id,
      },
    })

    res.status(204).json('ok')
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Not found employee',
    })
  }
}

/**
 *
 * @route PUT /api/employees/edit/:id
 * @desc edit employee
 * @access Privat
 */

const edit = async (req, res) => {
  const data = req.body
  const id = data.id

  try {
    await prisma.employee.update({
      where: {
        id,
      },
      data,
    })
    res.status(204).json({
      message: 'ok',
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Employees could not be edit',
    })
  }
}

/**
 *
 * @route GET /api/employees/:id
 * @desc get singl employee
 * @access Privat
 */

const employee = async (req, res) => {
  const { id } = req.params

  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id,
      },
    })

    res.status(200).json(employee)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Could not obtain employee',
    })
  }
}

module.exports = {
  all,
  add,
  remove,
  edit,
  employee,
}

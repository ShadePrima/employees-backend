const express = require('express')
const router = express.Router()
const { auth } = require('../utils/auth')
const { all, add, remove, edit, employee } = require('../controllers/employees')

// GET /api/employees
router.get('/', auth, all)

// GET /api/employees/:id
router.get('/:id', auth, employee)

// POST /api/employees/add
router.post('/add', auth, add)

//POST /api/employess/remove
router.post('/remove/:id', auth, remove)

//PUT /api/employess/edit
router.put('/edit', edit)

module.exports = router

const express = require('express')
const router = express.Router()
const { auth } = require('../utils/auth')
const { all, add } = require('../controllers/employees')

// GET /api/employees
router.get('/', auth, all)

// GET /api/employees/:id
router.get('/:id', auth, (req, res, next) => console.log('git singl employess'))

// POST /api/employees/add
router.post('/add', auth, add)

//POST /api/employess/remove
router.post('/remove/:id', auth, () => console.log('remove employess'))

//PUT /api/employess/edit
router.put('/edit', auth, () => console.log('edit employees'))

module.exports = router

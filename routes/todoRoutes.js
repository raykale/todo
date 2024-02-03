const todoController = require('../controllers/todoController')
const express = require('express')
const router = express.Router()


router.get('/', todoController.index)
router.post('/', todoController.create)
router.put('/:id', todoController.update)
router.delete('/:id', todoController.auth, todoController.destroy)
router.get('/:id', todoController.show)

module.exports = router
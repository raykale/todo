const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todoController')

router.get('/', todosController.allTodo)
router.post('/', todoController.createTodo)
router.get('/:id', todoController.getTodo)
router.put('/:id', todoController.updateTodo)
router.delete('/:id', todoController.auth, todoController.deleteTodo)

module.exports = router
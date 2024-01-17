const Todo = require('../models/todo')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, 'secret')
        const todo = await Todo.findOne({ _id: data._id })
        if (!todo) {
          throw new Error()
        }
        req.todo = todo
        next()
      } catch (error) {
        res.status(401).send('Not authorized')
      }
}
exports.allTodo = async (req, res) => {
    try{
      const todo = await Todo.findOne({ email: req.body.email })
      if (!todo || !await bcrypt.compare(req.body.password, todo.password)) {
        res.status(400).send('Invalid login credentials')
      } else {
        const token = await todo.generateAuthToken()
        res.json({ todo, token })
      }
    } catch(error){
      res.status(400).json({message: error.message})
    }
  }

exports.createTodo = async (req, res) => {
    try{
      const todo = new Todo(req.body)
      await todo.save()
      const token = await todo.generateAuthToken()
      res.json({ todo, token })
    } catch(error){
      res.status(400).json({message: error.message})
    }
  }

  exports.createTodo = async (req, res) => {
    try{
      const todo = await Todo.findOne({ email: req.body.email })
      if (!todo || !await bcrypt.compare(req.body.password, todo.password)) {
        res.status(400).send('Invalid login credentials')
      } else {
        const token = await todo.generateAuthToken()
        res.json({ todo, token })
      }
    } catch(error){
      res.status(400).json({message: error.message})
    }
  }

  exports.updateTodo = async (req, res) => {
    try{
      const updates = Object.keys(req.body)
      const todo = await Todo.findOne({ _id: req.params.id })
      updates.forEach(update => todo[update] = req.body[update])
      await todo.save()
      res.json(todo)
    }catch(error){
      res.status(400).json({message: error.message})
    }
    
  }
  
  exports.deleteTodo = async (req, res) => {
    try{
      await req.todo.deleteOne()
      res.json({ message: 'Todo deleted' })
    }catch(error){
      res.status(400).json({message: error.message})
    }
  }
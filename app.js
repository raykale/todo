const express = require('express')
// const morgan = require('morgan')
const app = express()
const todoRouter = require('./routes/todoRoutes')

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/todos', todoRouter)
// app.use(morgan('combined'))

module.exports = app
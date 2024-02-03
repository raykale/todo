require('dotenv').config()
const app = require('./app')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once('open', () => { 
    console.log('Mongo is showing love')
})

app.listen(PORT, () => {
    console.log(`We in the building ${PORT}`)
})


//NEW
// app.get('/todos/new', (req,res) => {
//     res.render('todos/New')
// })

//DELETE

//UPDATE

//CREATE
// app.post('/todos', async (req, res) => {
//     if(req.body.completed === 'on'){
//         req.body.completed = true
//     } else {
//         req.body.completed = false
//     }
//     try{
//         const createdTodo = await Todo.create(req.body)
//         res.redirect(`/todos/${createdTodo._id}`)
//     }catch (error) {
//         res.status(400).send({message: error.messege})
//     }
// })

//EDIT


//SHOW
// app.get('/todos/:id', async (req, res) => {
//     try {
//         const foundTodo = await Todo.findOne({_id: req.params.id})
//         res.render('todos/Show', {
//             fruit: foundTodo
//         })
//     } catch (error) {
//         res.status(400).send({ message: error.message })
//     }
// })

//PUT /todos/:id: Update a specific todo item.
//DELETE /todos/:id: Delete a specific todo item.
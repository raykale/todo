const Todo = require('../models/todo')


/*
200 - good response
  200 - ok
  201 - created
  204 - no content
300 - redirection
  301 - redirect
  302 - redirect
400 - bad response but it was the users fault
  401 - bad request
  401 - unathorized
  403 - forbidden
  404 - not found
500 - its the servers fault
*/

exports.index = async function index (req, res) {
//grab all todos
try {
    const todos = await Todo.find({})
    res.status(200).json(todos)
} catch (error) {
    res.status(400).json({ msg: error.message })
 }
}

exports.create = async function create (req, res) {
//make a new todo
    try {
    const todo = await Todo.create(req.body)
    res.status(200).json(todo)
    } catch (error) {
      res.status(400).json({ msg: error.message })
    }

}

exports.update = async function update (req, res) {
//update a todo that was already made
    try {
        const updatedTodo = await Todo.
        findOneAndUpdate({ _id: req.params.id },
        req.body, { new: true} )
        res.status(200).json(updatedTodo)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

exports.destroy = async function destroy (req, res) {
//delete an existing todo
    try {
        const deleted = await Todo.findOneAndDelete({ _id: req, res.params.id
        })
        res.status(200).json({ msg: `The todo with the Id of ${req.params.td} was deleted from the MongoDB database, no further action neccessary`})
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

exports.show = async function show (req, res) {
//show 1 individual todo
    try {
        const foundTodo = await Todo.findOne({ _id: req.params.id })
        res.status(200).json(foundTodo)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}


// exports.auth = async (req, res, next) => {
//     try {
//         const token = req.header('Authorization').replace('Bearer ', '')
//         const data = jwt.verify(token, 'secret')
//         const todo = await Todo.findOne({ _id: data._id })
//         if (!todo) {
//           throw new Error()
//         }
//         req.todo = todo
//         next()
//       } catch (error) {
//         res.status(401).send('Not authorized')
//       }
// }
// exports.allTodo = async (req, res) => {
//     try{
//       const todo = await Todo.findOne({ email: req.body.email })
//       if (!todo || !await bcrypt.compare(req.body.password, todo.password)) {
//         res.status(400).send('Invalid login credentials')
//       } else {
//         const token = await todo.generateAuthToken()
//         res.json({ todo, token })
//       }
//     } catch(error){
//       res.status(400).json({message: error.message})
//     }
//   }

// exports.createTodo = async (req, res) => {
//     try{
//       const todo = new Todo(req.body)
//       await todo.save()
//       const token = await todo.generateAuthToken()
//       res.json({ todo, token })
//     } catch(error){
//       res.status(400).json({message: error.message})
//     }
//   }

//   exports.createTodo = async (req, res) => {
//     try{
//       const todo = await Todo.findOne({ email: req.body.email })
//       if (!todo || !await bcrypt.compare(req.body.password, todo.password)) {
//         res.status(400).send('Invalid login credentials')
//       } else {
//         const token = await todo.generateAuthToken()
//         res.json({ todo, token })
//       }
//     } catch(error){
//       res.status(400).json({message: error.message})
//     }
//   }

//   exports.updateTodo = async (req, res) => {
//     try{
//       const updates = Object.keys(req.body)
//       const todo = await Todo.findOne({ _id: req.params.id })
//       updates.forEach(update => todo[update] = req.body[update])
//       await todo.save()
//       res.json(todo)
//     }catch(error){
//       res.status(400).json({message: error.message})
//     }
    
//   }
  
//   exports.deleteTodo = async (req, res) => {
//     try{
//       await req.todo.deleteOne()
//       res.json({ message: 'Todo deleted' })
//     }catch(error){
//       res.status(400).json({message: error.message})
//     }
//   }
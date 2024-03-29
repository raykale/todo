const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const todoSchema = new mongoose.Schema({
    title: { type: String, require: true },
    description: { type: String, required: true },
    complete: {type: Boolean, require: true }
}, {
    timestamps: true
})
//     title: String, required,
//     description: String,
//     completed: Boolean, default: false,
//     created_at: Date, default: Date.now
// })


todoSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 8)
    }
    next()
  })

todoSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({ _id: this._id }, 'secret')
    return token
  }
  
const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo


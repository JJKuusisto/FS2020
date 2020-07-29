const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body
  if(body.password.length < 3){
   return response.status(400).json({error: 'password too short, minimum is 3 characters'})
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const blogs = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
  response.json(blogs.map(b => b.toJSON()))
})
module.exports = usersRouter

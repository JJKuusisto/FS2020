const blogsRouter = require('express').Router()
const config = require('../utils/config')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.put('/:id/comments', async (request, response, next) => {
  const body = request.body
  const updated = {
    title: body.title,
    author: body.author,
    likes: body.likes,
    url: body.url,
    comments: body.comments
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, updated, { new: true }).populate('user', { username: 1, name: 1 })
  response.json(updatedBlog.toJSON())
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, config.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  console.log(decodedToken)
  const user = await User.findById(decodedToken.id)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
  const newBlog = await blog.save()
  user.blogs = user.blogs.concat(newBlog._id)
  await user.save()
  const addedUserInfo = await Blog.findById(newBlog.id).populate('user', { username: 1, name: 1 })
  response.json(addedUserInfo.toJSON())
})

blogsRouter.delete('/:id', async (request, response, next) => {
  token = request.token
  const decodedToken = jwt.verify(token, config.SECRET)
  const blog = await Blog.findById(request.params.id)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'missing or invalid token' })
  }
  if (blog.user.toString() === decodedToken.id) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(400).json({ error: 'you have no permission to delete this blog' })
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const updated = {
    title: body.title,
    url: body.url,
    author: body.author,
    likes: body.likes + 1
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, updated, { new: true }).populate('user', { username: 1, name: 1 })
  response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter


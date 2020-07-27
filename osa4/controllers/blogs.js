const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  const newBlog = await blog.save()
  response.json(newBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response, next) => {
  await Blog.findOneAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) =>{
  const body = request.body
  const updated = {
    title: body.title,
    url: body.url,
    author: body.author,
    likes: body.likes + 1
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, updated, {new : true})
  response.json(updatedBlog.toJSON)
})

module.exports = blogsRouter


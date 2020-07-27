const helper = require('./api_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () =>{
    await Blog.deleteMany({})
    await Blog.insertMany(helper.blogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs is returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.blogs.length)
})

test('_id is changed to id', async () => {
  const response = await api.get('/api/blogs')
  for(let blog of response.body){
    expect(blog.id).toBeDefined()
  }
})

test('POST works', async () => {
  const testBlog = new Blog({
    title: "Test blog",
    author: "Jarmo Kuusisto",
    url: "www.jkuusisto.net/testblog",
    likes: 20
  })
  await api
    .post('/api/blogs')
    .send(testBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  const blogsAfterPost = await helper.BlogsInDB()
  expect(blogsAfterPost).toHaveLength(helper.blogs.length + 1)

  const titles = blogsAfterPost.map(b => b.title)
  expect(titles).toContain('Test blog')
})

test('if likes is not set it\'s set to 0', async () =>{
  const testBlog = new Blog({
    title: "Test blog2",
    author: "Jarmo Kuusisto",
    url: "www.jkuusisto.net/testblog2"
  })

  await api
    .post('/api/blogs')
    .send(testBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)  

  const blogsAfterPost = await helper.BlogsInDB()
  const likes = blogsAfterPost.map(b => b.likes)
  for(like of likes){
    expect(typeof like).toEqual("number")
  }
})

test('POST request have to contains title and url', async () =>{
  const testBlog = new Blog({
    author: "Jarmo Kuusisto"
  })

  await api
    .post('/api/blogs')
    .send(testBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})
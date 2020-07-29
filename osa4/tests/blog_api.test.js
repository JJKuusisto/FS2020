const bcrypt = require('bcrypt')
const helper = require('./api_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

let token = null

beforeAll( async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  const newUser = new User({username: 'root', passwordHash, name:'SuperUser'})
  await newUser.save()
  supertest(app)
    .post('/api/login')
    .send({
      username: 'root',
      password: 'sekret',
    })
    .end((err, response) => {
      token = response.body.token; // save the token!
    })
})

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
    title: "Test blog auth",
    author: "Jarmo Kuusisto",
    url: "www.jkuusisto.net/testblog_auth",
    likes: 20
  })
  await api
    .post('/api/blogs')
    .set('Authorization', 'Bearer ' + token)
    .send(testBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  const blogsAfterPost = await helper.BlogsInDB()
  expect(blogsAfterPost).toHaveLength(helper.blogs.length + 1)

  const titles = blogsAfterPost.map(b => b.title)
  expect(titles).toContain('Test blog auth')
})

test('if likes is not set it\'s set to 0', async () =>{
  const testBlog = new Blog({
    title: "Test blog2",
    author: "Jarmo Kuusisto",
    url: "www.jkuusisto.net/testblog2"
  })

  await api
    .post('/api/blogs')
    .set('Authorization', 'Bearer ' + token)
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
    .set('Authorization', 'Bearer ' + token)
    .send(testBlog)
    .expect(400)
})

test('Posting without token fails', async () =>{
  const testBlog = new Blog({
    title: "Test blog auth",
    author: "Jarmo Kuusisto",
    url: "www.jkuusisto.net/testblog_auth",
    likes: 20
  })

  await api
    .post('/api/blogs')
    .send(testBlog)
    .expect(401)
})

afterAll(() => {
  mongoose.connection.close()
})

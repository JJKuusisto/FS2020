require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const Note = require('./models/note')

const errorHandler = (error, req, res, next) =>{
  console.error(error.message)

  if(error.name === 'CastError'){
    return res.status(400).send({error: 'malformatted id'})
  }
  next(error)
}

const unknownEndpoint = (req,res) => {
  res.status(404).send({error: 'unknown endpoint'})
}

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

app.get('/', (req,res) =>{
  res.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (req, res) => {
  Note.find({}).then(notes =>{
    res.json(notes)
  })
})

app.get('/api/notes/:id', (req, res) =>{
  const id = req.params.id
  Note.findById(id).then(note =>{
    if(note){
      res.json(note)
    } else{
      res.status(404).end()
    }
  })
    .catch(error =>{
      console.log(error)
      res.status(400).send({error: 'malformatted id'})
    })
}) 

app.post('/api/notes', (req,res) =>{
  const body = req.body

  if (!body.content){
    return res.status(400).json({
      error:'content missing'
    })
  }
  const note = new Note({
    content: body.content,
    important: body.important,
    date: new Date(),
  })

  note.save().then(savedNote =>{
    res.json(savedNote)
  })
})

app.delete('/api/notes/:id', (req,res,next) => {
  Note.findOneAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/notes/:id', (req,res,next) =>{
  const body = req.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(req.params.id, note, {new:true})
    .then(updatedNote =>{
      res.json(updatedNote)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)
const PORT= process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server in running on port ${PORT}`)
})

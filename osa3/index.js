require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

const errorHandler = (error, req, res, next) =>{
  console.error(error.message)
  if(error.name === 'CastError'){
    return res.status(400).send({error: 'malformatted id'})
  }
  next(error)
}
app.use(express.static('build'))
app.use(cors())
morgan.token('custom', (req, res) =>{
  return JSON.stringify(req.body) 
})
app.use(express.json())
app.use(morgan(':method :url :status :response-time ms :custom'))

app.get('/api/persons', (req, res) =>{
  Person.find({}).then(persons =>{
   res.json(persons) 
  })
    .catch(error => next(error))
})
app.get('/info', (req, res)=>{
  Person.find({}).then(persons =>{
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${Date()}</p>`) 
  })
})
app.get('/api/persons/:id', (req, res, next) =>{
  const id = req.params.id
  Person.findById(id).then(person =>{
    if(person){
      res.json(person)
    } else{
      res.status(404).end()
    }
  })
    .catch(error => next(error))
  
})

app.delete('/api/persons/:id', (req, res, error) =>{
  const id = req.params.id
  Person.findByIdAndRemove(id)
    .then(result =>{
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next)=>{
  const body = req.body
  if(!body.name || !body.number){
    console.log("error: name or number missing")
    return res.status(400).json({error:"name or number missing"})
  } 

  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person.save()
    .then(newPerson => {
    res.json ( newPerson )
  })
})

app.put('/api/persons/:id', (req, res, next)=>{
  const body = req.body
  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, {new:true})
    .then(updatedPerson =>{
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT 
app.listen(PORT, () =>{
  console.log(`Server running on port ${PORT}`)
})

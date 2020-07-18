const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
morgan.token('custom', (req, res) =>{
  return JSON.stringify(req.body) 
})
app.use(express.json())
app.use(morgan(':method :url :status :response-time ms :custom'))

let persons = [
    {
      "name": "Hilkka Kyläpyörä",
      "number": "050-1234567",
      "id": 2
    },
    {
      "name": "Anu Saukko",
      "number": "045-345667",
      "id": 3
    }
  ]
app.get('/api/persons', (req, res) =>{
  res.json(persons)
})
app.get('/info', (req, res)=>{
  res.send(`<p>Phone has info for ${persons.length} people</p><p>${Date()}</p>`) 
})
app.get('/api/persons/:id', (req, res) =>{
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  if(person){
    res.json(person)
  } else{
    res.status(404).end()
  }
  
})

app.delete('/api/persons/:id', (req, res) =>{
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
})
const newId = () =>{
  return Math.floor(Math.random() * Math.floor(9999999999))
}
app.post('/api/persons', (req, res)=>{
  const body = req.body
  if(!body.name || !body.number){
    return res.status(400).json({error:"name or number missing"})
  } 
  if(persons.find(p => p.name === body.name)){
    return res.status(400).json({error:"person is already in the list"})
  }
  person = {
    name: body.name,
    number: body.number,
    id: newId()
  }
  persons = persons.concat(person)
  res.json(person)
})

const PORT = process.env.PORT || 3010 
app.listen(PORT, () =>{
  console.log(`Server running on port ${PORT}`)
})

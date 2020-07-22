const mongoose = require('mongoose')

if(process.argv.length < 3){
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fs2020:${password}@cluster0-l0fay.mongodb.net/fs2020puhmuistio?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv[3] !== '' && process.argv.length >= 4){
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })
  person.save().then(res =>{
    console.log(`Added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    mongoose.connection.close()
  }) 
} else{
  Person.find({}).then(res =>{
    console.log('Phonebook:')
    res.forEach(p =>{
      console.log(p.name + " " + p.number)
    })
    mongoose.connection.close()
  })
}

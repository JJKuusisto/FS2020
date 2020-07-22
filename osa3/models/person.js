const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const url = process.env.MONGODB_URI 
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result =>{
    console.log('connected to MONGODB')
  })
  .catch(( error ) =>{
    console.log('Error connecting mongo', error.message)
  })
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)

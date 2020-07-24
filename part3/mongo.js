const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fs2020:${password}@cluster0-l0fay.mongodb.net/test20?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

//const note = new Note({
//  content: 'HTML is Easy',
//  date: new Date(),
//  important: true,
//})
//
//note.save().then(response => {
//  console.log('note saved!')
//  mongoose.connection.close()
//})

Note.find({}).then(res =>{
  res.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})


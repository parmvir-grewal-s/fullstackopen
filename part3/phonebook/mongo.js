const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('Please supply enough arguments! 1: Password, 2: Name, 3: Number')
  process.exit(1)
}

if (process.argv.length === 4) {
  console.log('Invalid amount of arguments!')
  process.exit(1)
}
const password = process.argv[2]

const url =
  `mongodb+srv://parmvirgrewals:${password}@cluster0.ujlyixv.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)


if (process.argv.length === 3) {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}

else if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(
    console.log(`added ${name} number ${number} to phonebook`),
    mongoose.connection.close()
  )
}
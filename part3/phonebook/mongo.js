if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
  }
  
  const password = process.argv[2]
  
  const url =
    `mongodb+srv://parmvirgrewals:${password}@cluster0.ujlyixv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  
  mongoose.set('strictQuery',false)
  
  mongoose.connect(url)
  
  const personSchema = new mongoose.Schema({
    name: String,
    number: String
  })
  
  const Person = mongoose.model('Person', noteSchema)
  
  const person = new Person({
    name: "Jason Derulo",
    number: "07974939282"
  })
  
  person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
  })
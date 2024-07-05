require('dotenv').config();
const mongoose = require('mongoose')

const url = process.env.MONGODB_URL;
console.log('Connecting to ', url)
mongoose.set('strictQuery',false)
mongoose.connect(url).then(result => {
    console.log('Connected to MongoDB.')
})
.catch(error => {
    console.log('error connecting to MongoDB. ', error.message)
})

const personSchema = new mongoose.Schema({
    name: {
      type: String,
      minLength: 3,
      required: true
    },
    number: {
      type: String,
      minLength: 9,
      validate: {
        validator: function(v) {
          return /^\d{2,3}[\-]\d/.test(v);
        }
      },
      message: props => `${props.value} is not a valid phone number!`,
      required: true
    }
  })

  personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
module.exports = mongoose.model('Person', personSchema)

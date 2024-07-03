const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())
app.use(express.static('dist'))
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'));
const cors = require('cors')
app.use(cors())
require('dotenv').config()
const Person = require('./models/person')

app.get('/', (request, response) => {
    console.log(request.body)
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    Person.find({}).exec(function (err, results) {
        var count = results.length
      });
    const date = new Date()
    response.send(
        "<p>Phonebook has info for " + count + " people</p>" + "<p>" + date + "</p>"
    )
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    if(!request.body.name) {
        return response.status(400).json({ 
            error: 'name missing' 
        })
    }
    if (!request.body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
      }

    if(persons.find(person => person.name === request.body.name)) {
        return response.status(409).json({
            error: 'name must be unique'
        })
    }
    const body = request.body
    const id = Math.floor(Math.random() * 10000)
    const person = {
        id: String(id),
        name: body.name,
        number: body.number
    }
        persons = persons.concat(person)
        response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
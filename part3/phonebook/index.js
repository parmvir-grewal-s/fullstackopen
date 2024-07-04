require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())
app.use(express.static('dist'))
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'));
const cors = require('cors')
app.use(cors())
const Person = require('./models/person')

app.get('/', (request, response) => {
    console.log(request.body)
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    Person.countDocuments().then(result => {
        console.log(result)
        const date = new Date()
    response.send(
        "<p>Phonebook has info for " + result + " people</p>" + "<p>" + date + "</p>"
    )
    })
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

    if (!isValidObjectId(id)) {
        return response.status(400).json({ error: 'invalid id format' });
    }
    Person.findById(id).then(result => {
        if(result) {
            response.json(result)
        }
        else {
            response.status(404).end()
        }
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    Person.deleteOne({_id: id}).then(result => {
        if(result) {
            console.log('Found & removed.')
            return response.status(204).end()
        }
        else{
            console.log('No person with given ID')
            return response.status(204).end()
        }
    })
})

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body
  
    Person.findByIdAndUpdate(
      request.params.id, 
      { name, number },
      { new: true, runValidators: true, context: 'query' }
    ) 
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
  })

app.post('/api/persons', (request, response, next) => {
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

    Person.exists({ name: request.body.name }).then(result => { 
        if (result) {
            return response.status(409).json({
                error: 'name must be unique'
            });
        } else {
            const body = request.body;
            const person = new Person({
                name: body.name,
                number: body.number
            });
            person.save().then(savedPerson => {
                return response.json(savedPerson);
            }).catch(error => next(error));
        }
    }).catch(error => next(error));
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  // handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
      }
    next(error)
  }

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
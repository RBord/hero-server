const mongoose = require('mongoose')
require('dotenv').config()

mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    console.log('Database connect success')
  })
  .catch((error) => {
    console.log(error.message)
  })

const express = require('express')
const cors = require('cors')
// const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const swaggerDocs = require('./swagger.json')

const PORT = process.env.PORT || 5000

const superheroesRouter = require('./routes/api/superheroes')
const imagesRouter = require('./routes/api/images')
const app = express()

// const swaggerOptions = {
//   swaggerDefinition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Superheroes API',
//       version: '1.0.0',
//       description: 'A simple Express Superheroes API',
//     },
//     servers: [
//       {
//         url: 'http://localhost:5050',
//         description: 'development',
//       },
//       {
//         url: 'https://create-hero-app.herokuapp.com',
//         description: 'production',
//       },
//     ],
//   },
//   apis: ['./routes/api/*.js'],
// }

app.use(cors())
app.use(express.json())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
app.use('/api/superheroes', superheroesRouter)
app.use('/api/images', imagesRouter)
app.use(express.static('public'))

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err
  res.status(status).json({ message })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`)
})

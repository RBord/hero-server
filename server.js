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

const PORT = process.env.PORT || 5000

const superheroesRouter = require('./routes/api/superheroes')
const imagesRouter = require('./routes/api/images')
const app = express()

app.use(cors())
app.use(express.json())

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

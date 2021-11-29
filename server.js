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
const path = require('path')
const fs = require('fs').promises

const tempDir = path.join(process.cwd(), 'temp')
const uploadDir = path.join(process.cwd(), 'public/images')

const swaggerUI = require('swagger-ui-express')
const swaggerDocs = require('./swagger.json')

const PORT = process.env.PORT || 5000

const superheroesRouter = require('./routes/api/superheroes')
const imagesRouter = require('./routes/api/images')
const app = express()

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

const isAccessible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false)
}

const createFolderIsNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder)
  }
}

app.listen(PORT, () => {
  createFolderIsNotExist(tempDir),
    createFolderIsNotExist(uploadDir),
    console.log(`Server running on port ${PORT}!`)
})

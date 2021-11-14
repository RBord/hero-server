const { NotFound } = require('http-errors')
const { Superhero } = require('../models/superhero')
const { successRes } = require('../utils/successRes')

const getAllSuperheroes = async (req, res) => {
  const result = await Superhero.find()
  successRes(res, result, 201)
}

const getSuperheroById = async (req, res) => {
  const { id } = req.params
  const result = await Superhero.findById(
    id,
    '_id nickname real_name superpowers origin_description catch_phrase images'
  )
  if (!result) {
    throw new NotFound(`Superhero with id - ${id} - Not found in Your base :(`)
  }
  successRes(res, result)
}

const addSuperhero = async (req, res) => {
  const { body } = req
  const result = await Superhero.create({ ...body })
  successRes(res, result, 201)
}

const deleteSuperhero = async (req, res) => {
  const { id } = req.params
  const result = await Superhero.findByIdAndDelete(id)
  if (!result) {
    throw new NotFound(`Superhero with id - ${id} - Not found in Your base :(`)
  }
  successRes(res, { message: 'Superhero successfully deleted from Your base' })
}

const updateSuperhero = async (req, res) => {
  const { id } = req.params
  const { body } = req

  const result = await Superhero.findByIdAndUpdate(id, body, { new: true })
  if (!result) {
    throw new NotFound('Not found!')
  }
  successRes(res, { message: 'Superhero successfully updated!' })
}

module.exports = {
  getAllSuperheroes,
  getSuperheroById,
  addSuperhero,
  deleteSuperhero,
  updateSuperhero,
}

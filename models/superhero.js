const { Schema, model } = require('mongoose')
const Joi = require('joi')

const superheroSchema = Schema(
  {
    nickname: {
      type: String,
      required: [true, 'Set  nickname of hero'],
    },
    real_name: {
      type: String,
      required: [true, 'Set real name of hero'],
    },
    origin_description: String,
    superpowers: {
      type: String,
      required: [true, 'Set superpowers of hero'],
    },
    catch_phrase: String,
    images: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
)

const joiSchema = Joi.object({
  nickname: Joi.string().min(1).required(),
  real_name: Joi.string().min(1).required(),
  origin_description: Joi.string().allow(''),
  superpowers: Joi.string().min(1).required(),
  catch_phrase: Joi.string().allow(''),
  images: Joi.string(),
})

const Superhero = model('superhero', superheroSchema)

module.exports = {
  Superhero,
  joiSchema,
}

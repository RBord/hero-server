const { Superhero } = require('../models/superhero')
const path = require('path')
const fs = require('fs/promises')

const { uploadFile } = require('../middlewares/aws-s3')

const addImages = async (req, res) => {
  const { id } = req.params
  const file = req.file
  const result = await uploadFile(file)

  const image = path.join('/images', result.Key)
  await Superhero.findByIdAndUpdate(id, { images: image })
  res.send({
    status: 200,
    images: image,
  })
}

module.exports = {
  addImages,
}

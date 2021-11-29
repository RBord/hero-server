const { Superhero } = require('../models/superhero')
const path = require('path')
const fs = require('fs/promises')
// const Jimp = require('jimp')

const { uploadFile, getFileStream } = require('../middlewares/aws-s3')

const addImages = async (req, res) => {
  const { id } = req.params
  const file = req.file
  const result = await uploadFile(file)

  const readStream = getFileStream(result.Key)
  readStream.pipe(res)
  const image = path.join('/images', result.Key)
  try {
    await Superhero.findByIdAndUpdate(id, { images: image })
    res.json({
      status: 200,
      images: image,
    })
  } catch {}
}

module.exports = {
  addImages,
}

const { Superhero } = require('../models/superhero')
const path = require('path')
const fs = require('fs/promises')
// const Jimp = require('jimp')

const { uploadFile, getFileStream } = require('../middlewares/aws-s3')

const addImages = async (req, res) => {
  const { id } = req.params
  const file = req.file
  const result = await uploadFile(file)
  const { path: tempDir } = req.file
  const readStream = getFileStream(result.Key)
  readStream.pipe(res)
  try {
    const resultDir = path.join('public/images', result.Key)
    await fs.rename(tempDir, resultDir)
    await Superhero.findByIdAndUpdate(id, { images: resultDir })
    res.json({
      status: 200,
      images: resultDir,
    })
  } catch {}
}

module.exports = {
  addImages,
}

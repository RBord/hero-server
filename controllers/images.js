const { Superhero } = require('../models/superhero')
const path = require('path')
const fs = require('fs/promises')
const Jimp = require('jimp')

const addImages = async (req, res) => {
  const { description } = req.body
  const { id } = req.params
  const { path: tempDir, originalname } = req.file
  const avatarsDir = path.join(process.cwd(), 'public/images')
  consolelog(avatarsDir)
  Jimp.read(tempDir, (err, lenna) => {
    if (err) throw err
    lenna.resize(300, 200).quality(60)
  })
  try {
    const [extention] = originalname.split('.').reverse()
    const newAvatarName = `image-${id}.${extention}`
    const resultDir = path.join(avatarsDir, newAvatarName)
    await fs.rename(tempDir, resultDir)
    const avatar = path.join('/images', newAvatarName)
    await Superhero.findByIdAndUpdate(id, { images: avatar })
    res.json({
      description,
      status: 200,
      images: avatar,
    })
  } catch (error) {
    await fs.unlink(tempDir)
    throw error
  }
}

module.exports = {
  addImages,
}

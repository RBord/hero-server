const { Superhero } = require('../models/superhero')
const path = require('path')
const fs = require('fs/promises')
// const Jimp = require('jimp')

const { uploadFile, getFileStream } = require('../middlewares/aws-s3')

const addImages = async (req, res) => {
  const { id } = req.params
  const file = req.file
  const result = await uploadFile(file)
  // const { path: tempDir, originalname } = req.file
  // const avatarsDir = path.join(process.cwd(), 'public/images')
  // Jimp.read(tempDir, (err, lenna) => {
  //   if (err) throw err
  //   lenna.resize(300, 200).quality(60)
  // })
  // try {
  //   const [extention] = originalname.split('.').reverse()
  //   const newAvatarName = `image-${id}.${extention}`
  //   const resultDir = path.join(avatarsDir, newAvatarName)
  //   await fs.rename(tempDir, resultDir)

  const image = path.join('/images', result.Key)
  await Superhero.findByIdAndUpdate(id, { images: image })
  res.json({
    status: 200,
    images: image,
  })
}

module.exports = {
  addImages,
}

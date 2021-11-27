const multer = require('multer')
const path = require('path')

const uploadDir = path.join(process.cwd(), 'public/images')

const uploadConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({
  storage: uploadConfig,
}).single('image')

module.exports = upload

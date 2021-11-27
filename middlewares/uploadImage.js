const multer = require('multer')

const uploadConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/temp')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
  limits: {
    fileSize: 1048576,
  },
})

const upload = multer({
  storage: uploadConfig,
})

module.exports = upload

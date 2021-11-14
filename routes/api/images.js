const express = require('express')

const { controllerWrapper, uploadImage } = require('../../middlewares')
const { images: ctrl } = require('../../controllers')

const router = express.Router()

router.post(
  '/:id',
  uploadImage.single('image'),
  controllerWrapper(ctrl.addImages)
)

module.exports = router

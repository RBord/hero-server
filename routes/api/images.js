const express = require('express')

const { controllerWrapper, uploadImage } = require('../../middlewares')
const { images: ctrl } = require('../../controllers')

const router = express.Router()

router.post('/:id', uploadImage, controllerWrapper(ctrl.addImages))

module.exports = router

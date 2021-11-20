const express = require('express')
const { superheroes: ctrl } = require('../../controllers')
const { controllerWrapper, validation } = require('../../middlewares')
const { joiSchema } = require('../../models/superhero')
const router = express.Router()

router.get('/', controllerWrapper(ctrl.getAllSuperheroes))

router.get('/:id', controllerWrapper(ctrl.getSuperheroById))

router.post('/', validation(joiSchema), controllerWrapper(ctrl.addSuperhero))

router.delete('/:id', controllerWrapper(ctrl.deleteSuperhero))

router.patch(
  '/:id',
  validation(joiSchema),
  controllerWrapper(ctrl.updateSuperhero)
)

module.exports = router

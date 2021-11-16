const express = require('express')
const { superheroes: ctrl } = require('../../controllers')
const { controllerWrapper, validation } = require('../../middlewares')
const { joiSchema } = require('../../models/superhero')
const router = express.Router()
/**
 * @swagger
 * components:
 *  schemas:
 *    Superhero:
 *      type: object
 *      required:
 *        - nickname
 *        - real_name
 *        - superpowers
 *      properties:
 *        _id:
 *          type: string
 *          description: The auto-generated id of superhero
 *        nickname:
 *          type: string
 *          description: The nickname of superhero
 *        real_name:
 *          type: string
 *          description: The real name of superhero
 *        superpowers:
 *          type: string
 *          description: The powers of superhero
 *        catch_phrase:
 *          type: string
 *          description: The catch phrase of hero
 *        origin_description:
 *          type: string
 *          description: The origin description of hero
 *        images:
 *          type: string
 *          description: Image of hero
 *      example:
 *         nickname: name
 *         real_name: real Name
 *         superpowers: powers
 *
 *
 */
/**
 * @swagger
 * tags:
 *  name: Superheroes
 *  description: The Superheroes managing API
 */
/**
 * @swagger
 *  /api/superheroes:
 *    get:
 *      summary: Returns the list of all heroes
 *      tags: [Superheroes]
 *      responses:
 *        200:
 *          description: The list of the heroes
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Superhero'
 *
 *
 */

router.get('/', controllerWrapper(ctrl.getAllSuperheroes))
/**
 * @swagger
 *  /api/superheroes/{id}:
 *    get:
 *      summary: Get superhero by id
 *      tags: [Superheroes]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The hero id
 *      responses:
 *        '200':
 *          description: The hero description by id
 *          content:
 *            application/json:
 *              shema:
 *                $ref: '#/components/schemas/Superhero'
 *
 *        '404':
 *          description: The hero not found
 *
 */
router.get('/:id', controllerWrapper(ctrl.getSuperheroById))
/**
 * @swagger
 *  /api/superheroes:
 *    post:
 *      summary: Create a new hero
 *      tags: [Superheroes]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Superhero'
 *      responses:
 *        '200':
 *          description: The superhero was successfully created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Superhero'
 *        '500':
 *          description: Some server error
 *
 */
router.post('/', validation(joiSchema), controllerWrapper(ctrl.addSuperhero))
/**
 * @swagger
 *  /api/superheroes/{id}:
 *    delete:
 *      summary: Delete superhero by id
 *      tags: [Superheroes]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The hero id
 *      responses:
 *        '200':
 *          description: The hero successfully deleted
 *          content:
 *            application/json:
 *              shema:
 *                $ref: '#/components/schemas/Superhero'
 *
 *        '404':
 *          description: The hero not found
 *
 */
router.delete('/:id', controllerWrapper(ctrl.deleteSuperhero))
/**
 * @swagger
 *  /api/superheroes/{id}:
 *    patch:
 *      summary: Update superhero by id
 *      tags: [Superheroes]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The hero id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Superhero'
 *      responses:
 *        '200':
 *          description: The superhero was successfully created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Superhero'
 *        '500':
 *          description: Some server error
 *
 */
router.patch(
  '/:id',
  validation(joiSchema),
  controllerWrapper(ctrl.updateSuperhero)
)

module.exports = router

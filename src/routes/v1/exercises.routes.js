const express = require('express');
const router = express.Router();

const exerciseController = require('../../controllers/exercises.controller');

router.get('/', exerciseController.getAllExercises);           // GET /api/v1/exercises
router.get('/categories', exerciseController.getCategories);   // GET /api/v1/exercises/categories
router.get('/:id', exerciseController.getExerciseById);        // GET /api/v1/exercises/:id
router.post('/', exerciseController.createExercise);           // POST /api/v1/exercises
router.put('/:id', exerciseController.updateExercise);         // PUT /api/v1/exercises/:id
router.delete('/:id', exerciseController.deleteExercise);      // DELETE /api/v1/exercises/:id

module.exports = router;
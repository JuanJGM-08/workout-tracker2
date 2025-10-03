const express = require('express');
const router = express.Router();

const workoutExercisesController = require('../../controllers/workoutExercises.controller');

router.get('/', workoutExercisesController.getAllWorkoutExercises);           // GET /api/v1/workoutExercises
router.get('/:id', workoutExercisesController.getWorkoutExerciseById);        // GET /api/v1/workoutExercises/:id
router.post('/', workoutExercisesController.createWorkoutExercise);           // POST /api/v1/workoutExercises
router.put('/:id', workoutExercisesController.updateWorkoutExercise);         // PUT /api/v1/workoutExercises/:id
router.patch('/:id', workoutExercisesController.partialUpdateWorkoutExercise); // PATCH /api/v1/workoutExercises/:id
router.delete('/:id', workoutExercisesController.deleteWorkoutExercise);      // DELETE /api/v1/workoutExercises/:id

module.exports = router;
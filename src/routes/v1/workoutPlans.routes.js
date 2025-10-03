const express = require('express');
const router = express.Router();

const workoutPlansController = require('../../controllers/workoutPlans.controller');

router.get('/', workoutPlansController.getAllWorkoutPlans);      // GET /workoutPlans
router.get('/:id', workoutPlansController.getWorkoutPlanById);   // GET /workoutPlans/:id
router.post('/', workoutPlansController.createWorkoutPlan);      // POST /workoutPlans
router.put('/:id', workoutPlansController.updateWorkoutPlan);    // PUT /workoutPlans/:id
router.patch('/:id', workoutPlansController.partialUpdateWorkoutPlan); // PATCH /workoutPlans/:id
router.delete('/:id', workoutPlansController.deleteWorkoutPlan); // DELETE /workoutPlans/:id

module.exports = router;
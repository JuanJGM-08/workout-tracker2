const express = require('express');
const router = express.Router();

const workoutScheduleController = require('../../controllers/workoutSchedule.controller');

router.get('/', workoutScheduleController.getAllWorkoutSchedules);           // GET /api/v1/workoutSchedules
router.get('/:id', workoutScheduleController.getWorkoutScheduleById);        // GET /api/v1/workoutSchedules/:id
router.get('/user/:userId', workoutScheduleController.getSchedulesByUser);   // GET /api/v1/workoutSchedules/user/:userId
router.post('/', workoutScheduleController.createWorkoutSchedule);           // POST /api/v1/workoutSchedules/:id
router.put('/:id', workoutScheduleController.updateWorkoutSchedule);         // PUT /api/v1/workoutSchedules/:id
router.patch('/:id', workoutScheduleController.partialUpdateWorkoutSchedule); // PATCH /api/v1/workoutSchedules/:id
router.delete('/:id', workoutScheduleController.deleteWorkoutSchedule);      // DELETE /api/v1/workoutSchedules/:id

module.exports = router;    
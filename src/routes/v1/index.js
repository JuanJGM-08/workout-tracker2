const express = require('express');
const router = express.Router();

const usersRoutes = require('./users.routes');
const exercisesRoutes = require('./exercises.routes');
const workoutPlansRoutes = require('./workoutPlans.routes');
const workoutExercisesRoutes = require('./workoutExercises.routes');
const workoutScheduleRoutes = require('./workoutSchedule.routes');
const workoutReportRoutes = require('./workoutReport.routes');

router.use('/users', usersRoutes);
router.use('/exercises', exercisesRoutes);
router.use('/workoutPlans', workoutPlansRoutes);
router.use('/workoutExercises', workoutExercisesRoutes);
router.use('/workoutSchedules', workoutScheduleRoutes);
router.use('/workoutReports', workoutReportRoutes); 

module.exports = router;
const express = require('express');
const router = express.Router();

const usersRoutes = require('./users.routes');
const exercisesRoutes = require('./exercises.routes');
const workoutPlansRoutes = require('./workoutPlans.routes')

router.use('/users', usersRoutes);
router.use('/exercises', exercisesRoutes);
router.use('/workoutPlans', workoutPlansRoutes);

module.exports = router;
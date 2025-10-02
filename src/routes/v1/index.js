// src/routes/v1/index.js
const express = require('express');
const router = express.Router();

const usersRoutes = require('./users.routes');
const exercisesRoutes = require('./exercises.routes');

router.use('/users', usersRoutes);
router.use('/exercises', exercisesRoutes);

module.exports = router;
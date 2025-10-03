const express = require('express');
const router = express.Router();

const workoutReportController = require('../../controllers/workoutReport.controller');

router.get('/', workoutReportController.getAllWorkoutReports);           // GET /api/v1/workoutReports
router.get('/user/:userId', workoutReportController.getReportsByUser);   // GET /api/v1/workoutReports/user/:userId
router.get('/:id', workoutReportController.getWorkoutReportById);        // GET /api/v1/workoutReports/:id
router.post('/', workoutReportController.createWorkoutReport);           // POST /api/v1/workoutReports
router.delete('/:id', workoutReportController.deleteWorkoutReport);      // DELETE /api/v1/workoutReports/:id

module.exports = router;
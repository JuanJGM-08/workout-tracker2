let workoutReports = [
  {
    "workoutId": 1,
    "userId": "1", 
    "resistencia": 85,
    "fuerza": 75,
    "recuperacion": 90,
    "clientDetails": "01-04",
    "ejerciciosDestacados": ["Sentadillas", "Press Banca"]
  }
];

const workoutReportController = {
  getAllWorkoutReports: (req, res) => {
    try {
      res.status(200).json({
        result: workoutReports
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al obtener reportes'
      });
    }
  },

  getWorkoutReportById: (req, res) => {
    try {
      const { id } = req.params;
      const report = workoutReports.find(r => r.workoutId === parseInt(id));
      
      if (!report) {
        return res.status(404).json({
          error: 'Reporte no encontrado'
        });
      }
      
      res.status(200).json({
        result: report
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al obtener el reporte'
      });
    }
  },

  getReportsByUser: (req, res) => {
    try {
      const { userId } = req.params;
      const userReports = workoutReports.filter(r => r.userId === userId);
      
      res.status(200).json({
        result: userReports
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al obtener reportes del usuario'
      });
    }
  },

  createWorkoutReport: (req, res) => {
    try {
      const { userId, resistencia, fuerza, recuperacion } = req.body;

      if (!userId || !resistencia || !fuerza || !recuperacion) {
        return res.status(400).json({
          error: 'Todos los campos son requeridos'
        });
      }

      const newId = workoutReports.length > 0 ? 
        Math.max(...workoutReports.map(r => r.workoutId)) + 1 : 1;

      const newReport = {
        "workoutId": newId,
        "userId": userId,
        "resistencia": parseInt(resistencia),
        "fuerza": parseInt(fuerza), 
        "recuperacion": parseInt(recuperacion),
        "clientDetails": "01-04",
        "ejerciciosDestacados": ["Sentadillas", "Press Banca"]
      };

      workoutReports.push(newReport);

      res.status(201).json({
        result: newReport
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al crear reporte'
      });
    }
  },

  deleteWorkoutReport: (req, res) => {
    try {
      const { id } = req.params;
      const index = workoutReports.findIndex(r => r.workoutId === parseInt(id));

      if (index === -1) {
        return res.status(404).json({
          error: 'Reporte no encontrado'
        });
      }

      const deleted = workoutReports.splice(index, 1)[0];

      res.status(200).json({
        result: {
          message: 'Reporte eliminado',
          deletedReport: deleted
        }
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al eliminar reporte'
      });
    }
  }
};

module.exports = workoutReportController;
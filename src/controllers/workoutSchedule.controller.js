let workoutSchedules = [
  {
    id: "1",
    workoutPlanId: "1",
    userId: "1",
    scheduleDate: "2025-03-10",
    startTime: "08:00AM",
    endTime: "10:00AM",
    notes: "Primera sesión de entrenamiento",
    createdAt: "2024-01-15T10:00:00Z"
  }
];

const workoutScheduleController = {

  // GET /api/v1/workoutSchedules - Listar todos los horarios
  getAllWorkoutSchedules: (req, res) => {
    try {
      const { userId, workoutPlanId, scheduleDate, status } = req.query;
      let result = workoutSchedules;

      if (userId) {
        result = result.filter(ws => ws.userId === userId);
      }

      if (workoutPlanId) {
        result = result.filter(ws => ws.workoutPlanId === workoutPlanId);
      }

      if (scheduleDate) {
        result = result.filter(ws => ws.scheduleDate === scheduleDate);
      }

      if (status) {
        result = result.filter(ws => ws.status === status);
      }

      res.status(200).json({
        result
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al obtener horarios de entrenamiento'
      });
    }
  },

  // GET /api/v1/workoutSchedules/user/:userId - Obtener horarios por usuario
  getSchedulesByUser: (req, res) => {
    try {
      const { userId } = req.params;
      const { scheduleDate, status } = req.query;

      let userSchedules = workoutSchedules.filter(ws => ws.userId === userId);

      if (scheduleDate) {
        userSchedules = userSchedules.filter(ws => ws.scheduleDate === scheduleDate);
      }

      if (status) {
        userSchedules = userSchedules.filter(ws => ws.status === status);
      }

      res.status(200).json({
        result: userSchedules
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al obtener horarios del usuario'
      });
    }
  },

  // GET /api/v1/workoutSchedules/:id - Obtener horario por ID
  getWorkoutScheduleById: (req, res) => {
    try {
      const { id } = req.params;
      const workoutSchedule = workoutSchedules.find(ws => ws.id === id);

      if (!workoutSchedule) {
        return res.status(404).json({
          error: 'Horario de entrenamiento no encontrado'
        });
      }

      res.status(200).json({
        result: workoutSchedule
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al obtener el horario de entrenamiento'
      });
    }
  },

  // POST /api/v1/workoutSchedules - Crear nuevo horario
  createWorkoutSchedule: (req, res) => {
    try {
      const { workoutPlanId, userId, scheduleDate, startTime, endTime, status, notes } = req.body;

      // Validaciones
      if (!workoutPlanId || !userId || !scheduleDate || !startTime || !endTime) {
        return res.status(400).json({
          error: 'workoutPlanId, userId, scheduleDate, startTime y endTime son requeridos'
        });
      }

      const existingSchedule = workoutSchedules.find(ws => 
        ws.userId === userId && 
        ws.scheduleDate === scheduleDate && 
        ws.startTime === startTime
      );

      if (existingSchedule) {
        return res.status(400).json({
          error: 'Ya existe un horario programado para esta fecha y hora'
        });
      }

      const newWorkoutSchedule = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        workoutPlanId,
        userId,
        scheduleDate,
        startTime,
        endTime,
        notes: notes || '',
        createdAt: new Date().toISOString()
      };

      workoutSchedules.push(newWorkoutSchedule);

      res.status(201).json({
        result: newWorkoutSchedule
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al crear el horario de entrenamiento'
      });
    }
  },

  // PUT /api/v1/workoutSchedules/:id - Actualizar horario completo
  updateWorkoutSchedule: (req, res) => {
    try {
      const { id } = req.params;
      const { workoutPlanId, userId, scheduleDate, startTime, endTime, status, notes } = req.body;

      const index = workoutSchedules.findIndex(ws => ws.id === id);
      if (index === -1) {
        return res.status(404).json({
          error: 'Horario de entrenamiento no encontrado'
        });
      }

      // Validaciones
      if (!workoutPlanId || !userId || !scheduleDate || !startTime || !endTime) {
        return res.status(400).json({
          error: 'workoutPlanId, userId, scheduleDate, startTime y endTime son requeridos'
        });
      }

      // Verificar conflicto de horarios (excluyendo el actual)
      const scheduleConflict = workoutSchedules.find(ws => 
        ws.userId === userId && 
        ws.scheduleDate === scheduleDate && 
        ws.startTime === startTime &&
        ws.id !== id
      );

      if (scheduleConflict) {
        return res.status(400).json({
          error: 'Ya existe otro horario programado para esta fecha y hora'
        });
      }

      // Actualizar horario
      workoutSchedules[index] = {
        ...workoutSchedules[index],
        workoutPlanId,
        userId,
        scheduleDate,
        startTime,
        endTime,
        status: status || workoutSchedules[index].status,
        notes: notes || workoutSchedules[index].notes,
        updatedAt: new Date().toISOString()
      };

      res.status(200).json({
        result: workoutSchedules[index]
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al actualizar el horario de entrenamiento'
      });
    }
  },

  // PATCH /api/v1/workoutSchedules/:id - Actualización parcial
  partialUpdateWorkoutSchedule: (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      const index = workoutSchedules.findIndex(ws => ws.id === id);
      if (index === -1) {
        return res.status(404).json({
          error: 'Horario de entrenamiento no encontrado'
        });
      }

      // Validar que no haya conflictos de horario si se actualizan fecha/hora
      if ((updates.scheduleDate || updates.startTime) && updates.userId) {
        const userId = updates.userId || workoutSchedules[index].userId;
        const scheduleDate = updates.scheduleDate || workoutSchedules[index].scheduleDate;
        const startTime = updates.startTime || workoutSchedules[index].startTime;

        const scheduleConflict = workoutSchedules.find(ws => 
          ws.userId === userId && 
          ws.scheduleDate === scheduleDate && 
          ws.startTime === startTime &&
          ws.id !== id
        );

        if (scheduleConflict) {
          return res.status(400).json({
            error: 'Ya existe otro horario programado para esta fecha y hora'
          });
        }
      }

      // Actualizar solo los campos proporcionados
      const updatedSchedule = {
        ...workoutSchedules[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };

      workoutSchedules[index] = updatedSchedule;

      res.status(200).json({
        result: updatedSchedule
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al actualizar parcialmente el horario de entrenamiento'
      });
    }
  },

  // DELETE /api/v1/workoutSchedules/:id - Eliminar horario
  deleteWorkoutSchedule: (req, res) => {
    try {
      const { id } = req.params;
      const index = workoutSchedules.findIndex(ws => ws.id === id);

      if (index === -1) {
        return res.status(404).json({
          error: 'Horario de entrenamiento no encontrado'
        });
      }

      const deletedSchedule = workoutSchedules.splice(index, 1)[0];

      res.status(200).json({
        result: {
          message: 'Horario de entrenamiento eliminado correctamente',
          deletedSchedule: {
            id: deletedSchedule.id,
            scheduleDate: deletedSchedule.scheduleDate,
            startTime: deletedSchedule.startTime
          }
        }
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al eliminar el horario de entrenamiento'
      });
    }
  }
};

module.exports = workoutScheduleController;
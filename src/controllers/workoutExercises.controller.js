let workoutExercises = [
  {
    id: "1",
    workoutPlanId: "1",
    exerciseId: "1",
    sets: 4,
    repetitions: 10,
    weight: 70,
    notes: "Mantener buena forma",
    createdAt: "2024-01-15T10:00:00Z"
  }
];

const workoutExercisesController = {

  // GET /workoutExercises - Listar
  getAllWorkoutExercises: (req, res) => {
    try {
      const { workoutPlanId, exerciseId } = req.query;
      let filteredExercises = [...workoutExercises];

      if (workoutPlanId) {
        filteredExercises = filteredExercises.filter(we => we.workoutPlanId === workoutPlanId);
      }
      if (exerciseId) {
        filteredExercises = filteredExercises.filter(we => we.exerciseId === exerciseId);
      }

      res.status(200).json({
        result: filteredExercises
      });

    } catch (error) {
      res.status(500).json({
        error: 'Error al obtener ejercicios de entrenamientos'
      });
    }
  },

  // GET /workoutExercises/:id - Obtener ejercicio de entrenamiento por ID
  getWorkoutExerciseById: (req, res) => {
    try {
      const { id } = req.params;
      const workoutExercise = workoutExercises.find(we => we.id === id);
      
      if (!workoutExercise) {
        return res.status(404).json({
          error: 'Ejercicio de entrenamiento no encontrado'
        });
      }
      
      res.status(200).json({
        result: workoutExercise
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al obtener el ejercicio de entrenamiento'
      });
    }
  },

  // POST /workoutExercises - Crear nuevo ejercicio en entrenamiento
  createWorkoutExercise: (req, res) => {
    try {
      const { workoutPlanId, exerciseId, sets, repetitions, weight, notes } = req.body;
      
      // Validaciones básicas
      if (!workoutPlanId || !exerciseId || !sets) {
        return res.status(400).json({
          error: 'workoutPlanId, exerciseId y sets son requeridos'
        });
      }
      
      const newWorkoutExercise = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        workoutPlanId,
        exerciseId,
        sets: parseInt(sets),
        repetitions: parseInt(repetitions) || 0,
        weight: parseFloat(weight) || 0,
        notes: notes || '',
        createdAt: new Date().toISOString()
      };
      
      workoutExercises.push(newWorkoutExercise);
      
      res.status(201).json({
        result: newWorkoutExercise
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al crear el ejercicio de entrenamiento'
      });
    }
  },

  // PUT /workoutExercises/:id - Actualizar ejercicio completo
  updateWorkoutExercise: (req, res) => {
    try {
      const { id } = req.params;
      const { workoutPlanId, exerciseId, sets, repetitions, weight, notes } = req.body;
      
      const exerciseIndex = workoutExercises.findIndex(we => we.id === id);
      
      if (exerciseIndex === -1) {
        return res.status(404).json({
          error: 'Ejercicio de entrenamiento no encontrado'
        });
      }
      
      // Validaciones básicas
      if (!workoutPlanId || !exerciseId || !sets) {
        return res.status(400).json({
          error: 'workoutPlanId, exerciseId y sets son requeridos'
        });
      }
      
      workoutExercises[exerciseIndex] = {
        id,
        workoutPlanId,
        exerciseId,
        sets: parseInt(sets),
        repetitions: parseInt(repetitions) || 0,
        weight: parseFloat(weight) || 0,
        notes: notes || '',
        createdAt: workoutExercises[exerciseIndex].createdAt
      };
      
      res.status(200).json({
        result: workoutExercises[exerciseIndex]
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al actualizar el ejercicio de entrenamiento'
      });
    }
  },

  // PATCH /workoutExercises/:id - Actualización 
  partialUpdateWorkoutExercise: (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const exerciseIndex = workoutExercises.findIndex(we => we.id === id);
      
      if (exerciseIndex === -1) {
        return res.status(404).json({
          error: 'Ejercicio de entrenamiento no encontrado'
        });
      }
      
      // modificacion de Pach
      const updatedExercise = {
        ...workoutExercises[exerciseIndex],
        ...updates
      };
      
      workoutExercises[exerciseIndex] = updatedExercise;
      
      res.status(200).json({
        result: updatedExercise
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al actualizar parcialmente el ejercicio de entrenamiento'
      });
    }
  },

  // DELETE /workoutExercises/:id - Eliminar ejercicio
  deleteWorkoutExercise: (req, res) => {
    try {
      const { id } = req.params;
      const exerciseIndex = workoutExercises.findIndex(we => we.id === id);
      
      if (exerciseIndex === -1) {
        return res.status(404).json({
          error: 'Ejercicio de entrenamiento no encontrado'
        });
      }
      
      const deletedExercise = workoutExercises.splice(exerciseIndex, 1)[0];
      
      res.status(200).json({
        result: {
          message: 'Ejercicio de entrenamiento eliminado exitosamente',
          deletedExercise: {
            id: deletedExercise.id,
            workoutPlanId: deletedExercise.workoutPlanId,
            exerciseId: deletedExercise.exerciseId
          }
        }
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al eliminar el ejercicio de entrenamiento'
      });
    }
  }
};

module.exports = workoutExercisesController;
let workoutPlans = [
  {
    id: "1",
    name: "Rutina Principiante Full Body",
    description: "Rutina completa para quienes inician en el gym",
    category: "full_body",
    difficulty: "beginner", 
    userId: "1",
    createdAt: "2024-01-15T10:00:00Z",
  }
];

const workoutPlansController = {

  // GET /workoutPlans - Listar todos los planes de entrenamiento
  getAllWorkoutPlans: (req, res) => {
    try {
      res.status(200).json({
        result: workoutPlans
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al obtener planes de entrenamiento'
      });
    }
  },

  // GET /workoutPlans/:id - Obtener plan por ID
  getWorkoutPlanById: (req, res) => {
    try {
      const { id } = req.params;
      const workoutPlan = workoutPlans.find(plan => plan.id === id);
      
      if (!workoutPlan) {
        return res.status(404).json({
          error: 'Plan de entrenamiento no encontrado'
        });
      }
      
      res.status(200).json({
        result: workoutPlan
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al obtener el plan de entrenamiento'
      });
    }
  },

  // POST /workoutPlans - Crear nuevo plan
  createWorkoutPlan: (req, res) => {
    try {
      const { name, description, category, difficulty, userId } = req.body;
      
      // Validaciones básicas
      if (!name || !category || !difficulty || !userId) {
        return res.status(400).json({
          error: 'Nombre, categoría, dificultad y userId son requeridos'
        });
      }
      
      const newWorkoutPlan = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name,
        description: description || '',
        category,
        difficulty,
        userId,
        createdAt: new Date().toISOString(),
      };
      
      workoutPlans.push(newWorkoutPlan);
      
      res.status(201).json({
        result: newWorkoutPlan
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al crear el plan de entrenamiento'
      });
    }
  },

  // PUT /workoutPlans/:id - Actualizar plan completo
  updateWorkoutPlan: (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, category, difficulty, userId } = req.body;
      
      const planIndex = workoutPlans.findIndex(plan => plan.id === id);
      
      if (planIndex === -1) {
        return res.status(404).json({
          error: 'Plan de entrenamiento no encontrado'
        });
      }
      
      // Validaciones básicas
      if (!name || !category || !difficulty || !userId) {
        return res.status(400).json({
          error: 'Nombre, categoría, dificultad y userId son requeridos'
        });
      }
      
      workoutPlans[planIndex] = {
        ...workoutPlans[planIndex],
        name,
        description: description || '',
        category,
        difficulty,
        userId
      };
      
      res.status(200).json({
        result: workoutPlans[planIndex]
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al actualizar el plan de entrenamiento'
      });
    }
  },

  // PATCH /workoutPlans/:id - Actualización parcial
  partialUpdateWorkoutPlan: (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const planIndex = workoutPlans.findIndex(plan => plan.id === id);
      
      if (planIndex === -1) {
        return res.status(404).json({
          error: 'Plan de entrenamiento no encontrado'
        });
      }
      
      // Actualizar solo los campos proporcionados
      const updatedPlan = {
        ...workoutPlans[planIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      workoutPlans[planIndex] = updatedPlan;
      
      res.status(200).json({
        data: updatedPlan
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al actualizar parcialmente el plan de entrenamiento'
      });
    }
  },

  // DELETE /workoutPlans/:id - Eliminar plan
  deleteWorkoutPlan: (req, res) => {
    try {
      const { id } = req.params;
      const planIndex = workoutPlans.findIndex(plan => plan.id === id);
      
      if (planIndex === -1) {
        return res.status(404).json({
          error: 'Plan de entrenamiento no encontrado'
        });
      }
      
      const deletedPlan = workoutPlans.splice(planIndex, 1)[0];
      
      res.status(200).json({
        result: {
          message: 'Plan eliminado exitosamente',
          deletedPlan: {
            id: deletedPlan.id,
            name: deletedPlan.name
          }
        }
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al eliminar el plan de entrenamiento'
      });
    }
  }
};

module.exports = workoutPlansController;
let exercises = [
  {
    id: "1",
    name: "Press de Banca",
    description: "Ejercicio para desarrollar pectorales, tríceps y hombros",
    category: "strength",
    muscleGroup: "pectoral",
    difficulty: "intermediate",
    createdAt: "2025-09-12T12:00:00.000Z"  
  },
  {
    id: "2",
    name: "Sentadillas",
    description: "Ejercicio fundamental para piernas y glúteos",
    category: "strength",
    muscleGroup: "legs",
    difficulty: "beginner",
    createdAt: "2025-09-12T12:00:00.000Z"  
  }
];

const exerciseController = {

  // GET /api/v1/exercises - todos los ejercicios
  getAllExercises: (req, res) => {
    try {
      const { category, muscleGroup, difficulty, search } = req.query;
      let result = exercises;

      if (category) {
        result = result.filter(e => e.category === category);
      }

      if (muscleGroup) {
        result = result.filter(e => e.muscleGroup === muscleGroup);
      }

      if (difficulty) {
        result = result.filter(e => e.difficulty === difficulty);
      }

      if (search) {
        result = result.filter(e =>
          e.name.toLowerCase().includes(search.toLowerCase()) ||
          e.description.toLowerCase().includes(search.toLowerCase())
        );
      }

      res.status(200).json({
        result
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al obtener ejercicios'
      });
    }
  },

  // GET /api/v1/exercises/:id - Obtener ejercicio por ID
  getExerciseById: (req, res) => {
    try {
      const { id } = req.params;
      const exercise = exercises.find(e => e.id === id);

      if (!exercise) {
        return res.status(404).json({
          error: 'Ejercicio no encontrado'
        });
      }
      res.status(200).json({
        result: exercise
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al obtener el ejercicio'
      });
    }
  },

  // POST /api/v1/exercises - Crear nuevo ejercicio
  createExercise: (req, res) => {
    try {
      const { name, description, category, muscleGroup, difficulty } = req.body;

      // Validaciones
      if (!name || !category || !muscleGroup) {
        return res.status(400).json({
          error: 'Nombre, categoría y grupo muscular son requeridos'
        });
      }

      // Verificar si el ejercicio ya existe
      const existingExercise = exercises.find(e => e.name.toLowerCase() === name.toLowerCase());
      if (existingExercise) {
        return res.status(400).json({
          error: 'El ejercicio ya está registrado'
        });
      }

      // Crear nuevo ejercicio
      const newExercise = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name,
        description: description || '',
        category,
        muscleGroup,
        difficulty: difficulty || 'beginner',
        createdAt: new Date().toISOString()
      };

      exercises.push(newExercise);

      res.status(201).json({
        result: newExercise
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al crear el ejercicio'
      });
    }
  },

  // PUT /api/v1/exercises/:id - Actualizar ejercicio
  updateExercise: (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, category, muscleGroup, difficulty } = req.body;

      const index = exercises.findIndex(e => e.id === id);
      if (index === -1) {
        return res.status(404).json({
          error: 'Ejercicio no encontrado'
        });
      }

      if (!name || !category || !muscleGroup) {
        return res.status(400).json({
          error: 'Nombre, categoría y grupo muscular son requeridos'
        });
      }

      const nameExists = exercises.some(e => 
        e.name.toLowerCase() === name.toLowerCase() && e.id !== id
      );
      if (nameExists) {
        return res.status(400).json({
          error: 'El nombre del ejercicio ya está en uso por otro ejercicio'
        });
      }

      exercises[index] = {
        ...exercises[index],
        name,
        description: description || exercises[index].description,
        category,
        muscleGroup,
        difficulty: difficulty || exercises[index].difficulty,
        updatedAt: new Date().toISOString()
      };

      res.status(200).json({
        result: exercises[index]
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al actualizar el ejercicio'
      });
    }
  },

  // DELETE /api/v1/exercises/:id  Eliminar ejercicio
  deleteExercise: (req, res) => {
    try {
      const { id } = req.params;
      const index = exercises.findIndex(e => e.id === id);

      if (index === -1) {
        return res.status(404).json({
          error: 'Ejercicio no encontrado'
        });
      }

      const deletedExercise = exercises.splice(index, 1)[0];

      res.status(200).json({
        result: {
          message: 'Ejercicio eliminado correctamente',
          deletedExercise: {
            id: deletedExercise.id,
            name: deletedExercise.name
          }
        }
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al eliminar el ejercicio'
      });
    }
  },

  // GET /api/v1/exercises/categories - Obtener todas las categorías
  getCategories: (req, res) => {
    try {
      const categories = [...new Set(exercises.map(e => e.category))];
      
      res.status(200).json({
        result: categories
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al obtener las categorías'
      });
    }
  }};


module.exports = exerciseController;
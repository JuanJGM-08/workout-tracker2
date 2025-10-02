let users = [
  {
    id: "1",
    name: 'Carlos Navia',
    email: "carlos@example.com",
    role: "user",
    createdAt: "2025-09-12T12:00:00.000Z"  
  }
];

const userController = {
  // GET /api/v1/users - Obtener todos los usuarios
  getAllUsers: (req, res) => {
    try {
      const { role, search } = req.query;
      let result = users;

      // Aplicar filtros
      if (role) {
        result = result.filter(u => u.role === role);
      }

      if (search) {
        result = result.filter(u =>
          u.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      res.status(200).json({
      result
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al obtener usuarios'
      });
    }
  },

  // GET /api/v1/users/:id - Obtener usuario por ID
  getUserById: (req, res) => {
    try {
      const { id } = req.params;
      const user = users.find(u => u.id === id);

      if (!user) {
        return res.status(404).json({
          error: 'Usuario no encontrado'
        });
      }
      res.status(200).json({
        result: user
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al obtener el usuario'
      });
    }
  },

  // POST /api/v1/users - Crear nuevo usuario
  createUser: (req, res) => {
    try {
      const { name, email, role } = req.body;

      // Validaciones
      if (!name || !email) {
        return res.status(400).json({
          error: 'Nombre y email son requeridos'
        });
      }

      // Verificar si el email ya existe
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        return res.status(400).json({
          error: 'El email ya está registrado'
        });
      }

      // Crear nuevo usuario
      const newUser = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name,
        email,
        role: role || 'user',
        createdAt: new Date().toISOString()
      };

      users.push(newUser);

      res.status(201).json({
        result: newUser
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al crear el usuario'
      });
    }
  },

  // PUT /api/v1/users/:id - Actualizar usuario
  updateUser: (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, role } = req.body;

      const index = users.findIndex(u => u.id === id);
      if (index === -1) {
        return res.status(404).json({
          error: 'Usuario no encontrado'
        });
      }

      if (!name || !email) {
        return res.status(400).json({
          error: 'Nombre y email son requeridos'
        });
      }

      // Verificar si el email ya existe en otro usuario
      const emailExists = users.some(u => u.email === email && u.id !== id);
      if (emailExists) {
        return res.status(400).json({
          error: 'El email ya está en uso por otro usuario'
        });
      }

      // Actualizar usuario
      users[index] = {
        ...users[index],
        name,
        email,
        role: role || users[index].role,
        updatedAt: new Date().toISOString()
      };

      res.status(200).json({
        data: users[index]
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al actualizar el usuario'
      });
    }
  },

  // DELETE /api/v1/users/:id - Eliminar usuario
  deleteUser: (req, res) => {
    try {
      const { id } = req.params;
      const index = users.findIndex(u => u.id === id);

      if (index === -1) {
        return res.status(404).json({
          error: 'Usuario no encontrado'
        });
      }

      const deletedUser = users.splice(index, 1)[0];

      res.status(200).json({
        result: {
          message: 'Usuario eliminado correctamente',
          deletedUser: {
            id: deletedUser.id,
            name: deletedUser.name
          }
        }
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al eliminar el usuario'
      });
    }
  }};
module.exports = userController;
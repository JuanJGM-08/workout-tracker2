const express = require('express');
const router = express.Router();

let users = [
  {
    id: "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
    name: 'Carlos Navia',
    email: "carlos@example.com",
    role: "user",
    createdAt: "2025-09-12T12:00:00.000Z"  
  }
];

router.get('/', (req, res) => {
  res.status(200).json(users);
});

// GET /users/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;   // 1
  const user = users.find(u => u.id === id);   // 2

  if (!user) {   // 3
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  res.status(200).json(user);   // 4
});

// POST /users
router.post('/', (req, res) => {
  const { name, email, role } = req.body;   // 1

  if (!name || !email) {   // 2
    return res.status(400).json({ error: 'Name y email son requeridos' });
  }

  const newUser = {   // 3
    id: `${Date.now()}`,  // identificador temporal
    name,
    email,
    role: role || 'user',  // valor por defecto si no envían rol
    createdAt: new Date().toISOString()
  };

  users.push(newUser);   // 4

  res.status(201).json(newUser);   // 5
});



module.exports = router;
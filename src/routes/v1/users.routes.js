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
    res.send('Get all users')
});

router.get('/', (req, res) => {
  res.status(200).json(users);
});


module.exports = router;
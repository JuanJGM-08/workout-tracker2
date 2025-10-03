const express = require('express');
const router = express.Router();


const userController = require('../../controllers/users.controller');

router.get('/', userController.getAllUsers);           // GET /api/v1/users
router.get('/:id', userController.getUserById);        // GET /api/v1/users/:id
router.post('/', userController.createUser);           // POST /api/v1/users
router.put('/:id', userController.updateUser);         // PUT /api/v1/users/:id
router.delete('/:id', userController.deleteUser);      // DELETE /api/v1/users/:id

module.exports = router;
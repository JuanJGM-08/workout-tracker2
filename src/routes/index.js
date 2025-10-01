const express = require('express');
const router = express.Router();
const v1Routes = require('./v1');

router.use('/v1', v1Routes);

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Bienvenido a la API',
    versions: {
      v1: '/api/v1'
    },
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
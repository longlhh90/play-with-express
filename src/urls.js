// defining endpoints
const express = require('express');
const router = express.Router();

const usersRouter = require('./routes/users.routes');
const vehiclesRouter = require('./routes/vehicles.routes');


router.use('/users', usersRouter);
router.use('/vehicles', vehiclesRouter);

module.exports = router
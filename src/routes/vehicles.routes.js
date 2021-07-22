const express = require('express');
const vehicleControllers = require('../controllers/vehicles.controllers');
const router = express.Router();

router.post('/', vehicleControllers.createVehicle);
router.get('/', vehicleControllers.getListOfVehicles);
router.get('/:vehicle_id', vehicleControllers.getVehicleByID);
router.delete('/:vehicle_id', vehicleControllers.removeVehicleByID);
router.put('/:vehicle_id', vehicleControllers.updateVehicleByID)

module.exports = router
const { getDatabase } = require('../database/db_mongo');
const { insertVehicle, getListVehicles, getVehicle, removeVehicle, editVehicle } = require('../database/vehicle');
const { ValidationError } = require('../middleware/exceptions');

const getListOfVehicles = async (req, res, next) => {
    keyword = req.query.q
    if (keyword) {
        filter = {
            make: keyword
        }
    } else {
        filter = {}
    }

    try {
        res.send(await getListVehicles(filter));
    } catch (err) {
        next(err)
    }
};

const getVehicleByID = async (req, res, next) => {
    vid = req.params.vehicle_id
    try {
        res.send(await getVehicle(vid));
    } catch (err) {
        next(err)
    }
};

const createVehicle = async (req, res, next) => {
    try {
        const neededKeys = ['make', 'model', 'year', 'price'];
        const vehicle_info = req.body;
        vehicle_info.status = 'live';
        if (!neededKeys.every(key => Object.keys(vehicle_info).includes(key))) {
            throw new ValidationError(`Missing keys in body request. Please pass all required fields in list: ${neededKeys}`)
        };

        res.send(await insertVehicle(vehicle_info));
    }
    catch (err) {
        next(err)
    }
};

const removeVehicleByID = async (req, res, next) => {
    vid = req.params.vehicle_id
    try {
        res.send(await removeVehicle(vid));
    } catch (err) {
        next(err)
    }
};

const updateVehicleByID = async (req, res, next) => {
    vid = req.params.vehicle_id
    vehicle = req.body
    try {
        res.send(await editVehicle(vid, vehicle));
    } catch (err) {
        next(err)
    }
};

module.exports = {
    getListOfVehicles,
    getVehicleByID,
    createVehicle,
    removeVehicleByID,
    updateVehicleByID
}
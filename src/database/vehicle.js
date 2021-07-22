const { getDatabase } = require('./db_mongo');
const ObjectID = require('mongodb').ObjectID;

const collectionName = 'vehicles';

async function insertVehicle(vehicle) {
    const database = await getDatabase();
    const { insertedId } = await database.collection(collectionName).insertOne(vehicle);
    new_vehicle = await database.collection(collectionName).findOne({ _id: insertedId });
    return new_vehicle
}

async function getListVehicles(filter) {
    const database = await getDatabase();
    //TODO: find way to filter by keyword with OR
    return await database.collection(collectionName).find(filter).toArray();
}

async function getVehicle(vid) {
    const database = await getDatabase();
    vehicle = await database.collection(collectionName).findOne({ _id: ObjectID(vid) });
    if (vehicle) {
        return vehicle;
    } else {
        return { message: "There is no vehicle match with this ID" }
    }
}

async function removeVehicle(vid) {
    const database = await getDatabase();
    result = await database.collection(collectionName).deleteOne({ _id: ObjectID(vid) });
    if (result.deletedCount === 1) {
        return { message: "Successfully deleted the vehicle" }
    } else {
        return { message: "There is no vehicle match with this ID" }
    }
}

async function editVehicle(vid, vehicle_to_update) {
    const database = await getDatabase();
    result = await database.collection(collectionName).updateOne({ _id: ObjectID(vid) }, { $set: vehicle_to_update });
    if (result.matchedCount === 1 && result.modifiedCount === 1) {
        return { message: "Successfully updated the vehicle" }
    } else {
        return { message: "There is no vehicle match with this ID" }
    }
}

module.exports = {
    insertVehicle,
    getListVehicles,
    getVehicle,
    removeVehicle,
    editVehicle,
};
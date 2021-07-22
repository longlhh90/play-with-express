// const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const MongoClient = require('mongodb');
const dotenv = require('dotenv');

// get config vars
dotenv.config();
// access config var
const DATABASE_NAME = process.env.DATABASE_NAME;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;

let database = null;

async function startDatabase() {
    try {
        const mongoDBURL = `mongodb+srv://${DATABASE_NAME}:${DATABASE_PASSWORD}@cluster0.l0l00.mongodb.net/testffun?retryWrites=true&w=majority`

        //Initiate MongoClient and connect to database
        const connection = await MongoClient.connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true });
        database = connection.db();
    } catch (err) {
        console.error(`Something went wrong: `, err);
    }

}

async function getDatabase() {
    if (!database) await startDatabase();
    return database;
}

async function closeDatabase() {
    if (database) {
        await MongoClient.close()
    }
}

module.exports = {
    getDatabase,
    startDatabase,
    closeDatabase,
};
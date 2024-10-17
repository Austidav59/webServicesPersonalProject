require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');

const client = new MongoClient(process.env.URI);

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (e) {
        console.error("Could not connect to MongoDB", e);
        throw e;
    }
}

async function getAllCars() {
    try {
        if (!client.topology || !client.topology.isConnected()) {
            await connectToMongoDB();
        }

        const listOfCars = await client
            .db("cars")
            .collection("cars")
            .find({})
            .toArray();
        
        return listOfCars;
    } catch (e) {
        console.error("Error fetching cars:", e);
        throw e;
    }
}

async function getSingleCar(id) {
    try {
        if (!client.topology || !client.topology.isConnected()) {
            await connectToMongoDB();
        }

        const query = { _id: new ObjectId(id) };
        console.log('Database query:', query); // Add this log
        const car = await client.db("cars").collection("cars").findOne(query);
        console.log('Database result:', car); // Add this log
        return car;
    } catch (e) {
        console.error("Error fetching single car:", e);
        throw e;
    }
}

async function addCar(newCar) {
    try {
        if (!client.topology || !client.topology.isConnected()) {
            await connectToMongoDB();
        }

        const result = await client
            .db("cars")
            .collection("cars")
            .insertOne(newCar);

        return { _id: result.insertedId, ...newCar };
    } catch (e) {
        console.error("Error adding new car:", e);
        throw e;
    }
}

async function updateCar(id, updatedCar) {
    try {
        if (!client.topology || !client.topology.isConnected()) {
            await connectToMongoDB();
        }

        const result = await client
            .db("cars")
            .collection("cars")
            .updateOne({ _id: new ObjectId(id) }, { $set: updatedCar });

        if (result.matchedCount === 0) {
            throw new Error('Car not found');
        }

        return { _id: id, ...updatedCar };
    } catch (e) {
        console.error("Error updating car:", e);
        throw e;
    }
}

async function deleteCar(id) {
    try {
        if (!client.topology || !client.topology.isConnected()) {
            await connectToMongoDB();
        }

        const result = await client
            .db("cars")
            .collection("cars")
            .deleteOne({ _id: new ObjectId(id) });

        return result;
    } catch (e) {
        console.error("Error deleting car:", e);
        throw e;
    }
}

module.exports = {
    connectToMongoDB,
    getAllCars,
    getSingleCar,
    addCar,
    updateCar,
    deleteCar
};
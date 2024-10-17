require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');

const client = new MongoClient(process.env.uri);

// Function to connect to MongoDB
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (e) {
        console.error("Could not connect to MongoDB", e);
        throw e;
    }
}

// Function to fetch all cars from the database
async function getAllCars() {
    try {
        // Ensure connection is established
        if (!client.topology || !client.topology.isConnected()) {
            await connectToMongoDB();
        }

        const listOfCars = await client
            .db("cars")
            .collection("cars")
            .find({})
            .toArray();
        
        console.log(listOfCars)
        return listOfCars;
    } catch (e) {
        console.error("Error fetching cars:", e);
        throw e;
    }
}




module.exports = {
    getAllCars,

};

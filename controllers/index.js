const connectDB = require('../modules/index');
const { ObjectId } = require('mongodb');

const welcome = async (req, res) => {
    res.json({ message: "Welcome to the Cars API" });
};

const getAllCars = async (req, res) => {
    try {
        const cars = await connectDB.getAllCars();
        res.json(cars);
    } catch (error) {
        console.error("Error fetching all cars:", error);
        res.status(500).json({ error: "Error fetching cars" });
    }
};

const getSingleCar = async (req, res) => {
    try {
        const id = req.params.id;
        console.log('Fetching car with id:', id); // Add this log
        const car = await connectDB.getSingleCar(id);
        if (!car) {
            return res.status(404).json({ error: "Car not found" });
        }
        res.json(car);
    } catch (error) {
        console.error("Error in getSingleCar:", error);
        res.status(500).json({ error: "Error fetching single car" });
    }
};

const addCar = async (req, res) => {
    try {
        const { make, model, year, color, price, isElectric, mileage } = req.body;

        if (!make || !model || !year || !color || !price || isElectric === undefined || !mileage) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const newCar = await connectDB.addCar({ make, model, year, color, price, isElectric, mileage });

        res.status(201).json({
            message: "Car added successfully",
            carId: newCar._id
        });
    } catch (error) {
        console.error("Error adding car:", error);
        res.status(500).json({ error: "Error adding car" });
    }
};

const updateCar = async (req, res) => {
    try {
        const id = req.params.id;
        const { make, model, year, color, price, isElectric, mileage } = req.body;

        if (!make || !model || !year || !color || !price || isElectric === undefined || !mileage) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const updatedCar = await connectDB.updateCar(id, {
            make, model, year, color, price, isElectric, mileage
        });

        if (!updatedCar) {
            return res.status(404).json({ error: "Car not found or update failed" });
        }

        res.status(200).json({ message: "Car updated successfully", updatedCar });
    } catch (error) {
        console.error("Error updating car:", error);
        res.status(500).json({ error: "Error updating car" });
    }
};

const deleteCar = async (req, res) => {
    try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        const result = await connectDB.deleteCar(id);

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Car not found" });
        }

        res.status(204).send();
    } catch (error) {
        console.error("Error in deleteCar:", error);
        res.status(500).json({ error: "Error deleting car", details: error.message });
    }
};

//###########################
// CONTROLLER FUNCTIONS FOR EMPLOYEES
//###########################
const getAllEmployees = async (req, res) => {
    try {
        const cars = await connectDB.getAllCars();
        res.json(cars);
    } catch (error) {
        console.error("Error fetching all cars:", error);
        res.status(500).json({ error: "Error fetching cars" });
    }
};

const getSingleEmployee = async (req, res) => {
    try {
        const id = req.params.id;
        console.log('Fetching car with id:', id); // Add this log
        const car = await connectDB.getSingleCar(id);
        if (!car) {
            return res.status(404).json({ error: "Car not found" });
        }
        res.json(car);
    } catch (error) {
        console.error("Error in getSingleCar:", error);
        res.status(500).json({ error: "Error fetching single car" });
    }
};

const addEmployee = async (req, res) => {
    try {
        const { make, model, year, color, price, isElectric, mileage } = req.body;

        if (!make || !model || !year || !color || !price || isElectric === undefined || !mileage) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const newCar = await connectDB.addCar({ make, model, year, color, price, isElectric, mileage });

        res.status(201).json({
            message: "Car added successfully",
            carId: newCar._id
        });
    } catch (error) {
        console.error("Error adding car:", error);
        res.status(500).json({ error: "Error adding car" });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const id = req.params.id;
        const { make, model, year, color, price, isElectric, mileage } = req.body;

        if (!make || !model || !year || !color || !price || isElectric === undefined || !mileage) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const updatedCar = await connectDB.updateCar(id, {
            make, model, year, color, price, isElectric, mileage
        });

        if (!updatedCar) {
            return res.status(404).json({ error: "Car not found or update failed" });
        }

        res.status(200).json({ message: "Car updated successfully", updatedCar });
    } catch (error) {
        console.error("Error updating car:", error);
        res.status(500).json({ error: "Error updating car" });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        const result = await connectDB.deleteCar(id);

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Car not found" });
        }

        res.status(204).send();
    } catch (error) {
        console.error("Error in deleteCar:", error);
        res.status(500).json({ error: "Error deleting car", details: error.message });
    }
};

module.exports = {
    welcome,
    getAllCars,
    getSingleCar,
    addCar,
    updateCar,
    deleteCar,
    getAllEmployees,
    getSingleEmployee,
    addEmployee,
    updateEmployee,
    deleteEmployee
};
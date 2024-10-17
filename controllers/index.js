const express = require('express');
const connectDB = require('../modules/index');

// Controller to get all cars
const getAllCars = async (req, res) => {
    try {
        const cars = await connectDB.getAllCars();
        res.json(cars);
    } catch (error) {
        console.error("Error fetching all cars:", error);
        res.status(500).json({ error: "Error fetching cars" });
    }
};

const welcome = async (req, res) => {
    try {
        res.json(welcome);
    } catch (error) {
        console.error("Error printing:", error);
        res.status(500).json({ error: "Error printinf" });
    }
};

const getSingleCar = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ error: "ID parameter is required" });
        }

        const car = await Connectdb.getSingleCar(id);
        res.json(contact);
    } catch (error) {
        console.error("Error in getSingleCar:", error);
        if (error.message === 'Invalid contact ID' || error.message === 'Contact not found') {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Error fetching single car" });
        }
    }
};

const addCar = async (req, res) => {
    try {
        console.log("Request Body:", req.body); // Debugging log
        const { first_name, last_name, email, birthday, color } = req.body;

        // Simple validation
        if (!first_name || !last_name || !email || !birthday || !color) {
            return res.status(400).json({ error: "First name, last name, email, birthday, and color are required." });
        }

        // Add the contact to the database and get the new contact object (including the ID)
        const newContact = await Connectdb.addContact({ first_name, last_name, email, birthday, color });

        // Send a response that includes the ID of the newly added contact
        res.status(201).json({
            message: "Contact added successfully",
            contactId: newContact._id
        });
    } catch (error) {
        console.error("Error adding contact:", error);
        res.status(500).json({ error: "Error adding contact" });
    }
};

const updateCar = async (req, res) => {
    try {
        const id = req.params.id;
        const { first_name, last_name, email, birthday, color } = req.body;

        console.log("ID to update:", id);
        console.log("Data to update:", { first_name, last_name, email, birthday, color });

        if (!first_name || !last_name || !email || !birthday || !color) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const updatedContact = await Connectdb.updateContact(id, {
            first_name, last_name, email, birthday, color
        });

        if (!updatedContact) {
            return res.status(404).json({ error: "Contact not found or update failed" });
        }

        res.status(200).json({ message: "Contact updated successfully", updatedContact });
    } catch (error) {
        console.error("Error updating contact:", error);
        res.status(500).json({ error: "Error updating contact" });
    }
};

const { ObjectId } = require('mongodb');

const deleteCar = async (req, res) => {
    try {
        const id = req.params.id;

        console.log("Attempting to delete contact with ID:", id);

        if (!ObjectId.isValid(id)) {
            console.log("Invalid ObjectId format:", id);
            return res.status(400).json({ error: "Invalid ID format" });
        }

        const result = await Connectdb.deleteContact(id);

        console.log("Delete operation result:", result);

        if (result.deletedCount === 0) {
            console.log("No contact found with ID:", id);
            return res.status(404).json({ error: "Contact not found" });
        }

        console.log("Contact successfully deleted");
        res.status(204).send();
    } catch (error) {
        console.error("Error in deleteContact:", error);
        res.status(500).json({ error: "Error deleting contact", details: error.message });
    }
};

module.exports = {
    getAllCars,
    welcome,
    updateCar,
    deleteCar,
    getSingleCar,
    addCar
};

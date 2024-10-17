const routes = require('express').Router();
const controller = require("../controllers/index");

//###################################//
// ROUTES FOR CARS //
//###################################
routes.get("/", controller.welcome)
// Get route for all cars
routes.get("/cars", controller.getAllCars);

// // Get route for specific car by ID
// routes.get("/cars/:id", controller.getSingleCar);

// // Post route to add a car
// routes.post("/addcar", controller.addCar);

// // PUT route to update a car by ID
// routes.put("/cars/:id", controller.updateCar);

// // DELETE route to delete a car by ID
// routes.delete("/cars/:id", controller.deleteCar);

//###########################################//
// EMPLOYEE ROUTES //
//###########################################//

// // Get route for all employees
// routes.get("/employees",

module.exports = routes;

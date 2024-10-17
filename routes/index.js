const routes = require('express').Router();
const controller = require("../controllers/index");

//###################################//
// ROUTES FOR CARS //
//###################################
routes.get("/", controller.welcome);
routes.get("/cars/:id", controller.getSingleCar);
routes.get("/cars", controller.getAllCars);
routes.post("/cars", controller.addCar);
routes.put("/cars/:id", controller.updateCar);
routes.delete("/cars/:id", controller.deleteCar);

module.exports = routes;
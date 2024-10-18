const routes = require('express').Router();
const controller = require("../controllers/index");

//###################################//
// ROUTES FOR CARS //
//###################################
routes.get("/", controller.welcome);
routes.get("/cars/:id", controller.getSingleCar);
routes.get("/cars", controller.getAllCars);
routes.post("/addcar", controller.addCar);
routes.put("/cars/:id", controller.updateCar);
routes.delete("/cars/:id", controller.deleteCar);

//##########################################
// ROUTES FOR EMPLOYEES
//#########################################
routes.get("/", controller.welcome);
routes.get("/employees/:id", controller.getSingleEmployee);
routes.get("/employees", controller.getAllEmployees);
routes.post("/addemployee", controller.addEmployee);
routes.put("/employees/:id", controller.updateEmployee);
routes.delete("/employees/:id", controller.deleteEmployee);

module.exports = routes;
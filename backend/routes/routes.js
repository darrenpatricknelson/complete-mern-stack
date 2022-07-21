const express = require('express');
// requiring all the controllers
const {
  getAllCars,
  getSingleCar,
  createCarEntry,
  deleteCar,
  updateCar
} = require('../controllers/car.controller.js');

// using express router
const router = express.Router();

// GET all Cars
router.get('/', getAllCars);

// GET single Car
router.get('/:id', getSingleCar);

// POST (create) new Car 
router.post('/create/', createCarEntry);

// DELETE a Car
router.delete('/delete/:id', deleteCar);

// UPDATE a Car
router.patch('/update/:id', updateCar);

module.exports = router;

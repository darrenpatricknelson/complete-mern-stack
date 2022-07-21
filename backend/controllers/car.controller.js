// import mongoose
const mongoose = require('mongoose');

// requiring our schema
const CarSchema = require('../models/cars.model.js');

// 
//     FIND ALL CARS
// 
// get all the cars
const getAllCars = async (req, res) => {
  // going to find all the cars in the db
  // will sort these cars in descending order using 'createdAt' and '-1'
  const allCars = await CarSchema.find({}).sort({ createdAt: -1 });

  //   response
  res.status(200).json(allCars);
};

// 
//     FIND A SINGLE CAR
// 
// get a single car
const getSingleCar = async (req, res) => {
  // getting the id from the params
  const { id } = req.params;

  // we need to check if the id above is valid
  // I've done some research and basically what I have found was the mongoose method below
  // When creating an object (document) in mongoDB, it creates an ObjectId automatically
  // There I can use this mongoose method to check whether the id in the params is valid
  // if it is not valid, I will return a 404 error
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      error: 'Car does not exist'
    });
  }

  // if the id is valid we can then move
  // and use the id to find the car
  const car = await CarSchema.findById(id);

  if (!car) {
    return res.status(404).json({
      error: 'Car does not exist'
    });
  }

  res.status(200).json(car);
};

// 
//     CREATE
// 
// create a new car entry
const createCarEntry = async (req, res) => {
  // destructuring the req (using postman body)
  const { model, make, registration, owner, year } = req.body;

  // adding the doc to the db using a try catch block
  try {
    // will create a new car object using the schema model we created and required
    const car = await CarSchema.create({
      make,
      model,
      registration,
      owner,
      year
    });

    // On the frontend, I always want the entire db
    const allCars = await CarSchema.find({}).sort({ createdAt: -1 });
    // our response will consist of a status code and the car object and the db
    res.status(200).json(allCars);
  } catch (error) {
    // if theres an error
    // our response will consist of a status code and the error message
    res.status(400).json({
      errorMsg: error.message
    });
  }
};

// 
//     DELETE
// 
// delete a car entry
const deleteCar = async (req, res) => {
  // getting the id from the params
  const { id } = req.params;

  // same as in the find function, we will use the below method
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      error: 'Car does not exist'
    });
  }

  // This function caught me out because I was trying to delete the car based off of it's ID
  // However in MongoDB, it is not called 'id' but '_id'
  const car = await CarSchema.findOneAndDelete({ _id: id });

  // check if the car actually exists
  if (!car) {
    // if the car does not exist, I want the full database returned with the error message
    const allCars = await CarSchema.find({}).sort({ createdAt: -1 });

    return res.status(404).json({
      error: 'Car does not exist',
      Database: allCars
    });
  }

  // However if that car does exist, I want to return the car that was deleted as well as the newly updated database
  const allCars = await CarSchema.find({}).sort({ createdAt: -1 });
  //   if it does exist, return a successful message
  res.status(200).json(allCars);
};

// 
//     UPDATE
// 
// update a car entry
const updateCar = async (req, res) => {
  // getting the id from the params
  const { id } = req.params;

  // check if the id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      error: 'Car does not exist'
    });
  }

  // use the spread operator to spread the req body
  const oldCar = await CarSchema.findOneAndUpdate(
    { _id: id },
    {
      ...req.body
    }
  );

  // check if the car actually exists
  if (!oldCar) {
    return res.status(404).json({
      error: 'Car does not exist'
    });
  }

  //   I want to return the old car document as well as the new car document
  // There for I run a simple findById function for the new document
  const newCar = await CarSchema.findById(id);

  // I also want the entire db
  const allCars = await CarSchema.find({}).sort({ createdAt: -1 });

  //   if it does exist, return a successful message
  res.status(200).json(allCars);
};

// exporting all the controller functions
module.exports = {
  getAllCars,
  getSingleCar,
  createCarEntry,
  deleteCar,
  updateCar
};

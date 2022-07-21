// imports
import { useEffect, useState } from 'react';
import { useCarContext } from '../hooks/useCarContext.js';

// components
import CarDetails from '../components/CarDetails.js';
import AddCarForm from '../components/AddCarForm.js';


const Home = () => {
  // destructure the context
  // we want the cars state and dispatch function
  const { cars, dispatch } = useCarContext();

  // this function will only run once when the component is rendered for the first time
  // It will make an api request and set the global state
  useEffect(() => {
    const fetchCarsFromDatabase = async () => {
      const res = await fetch('/api/cars/');
      const data = await res.json();

      if (res.ok) {
        // we want to update the state therefore we need to call the dispatch function
        dispatch({ type: 'GET_CARS', payload: data });
      }
    };

    // Calling the function
    fetchCarsFromDatabase();
  }, []);

  return (
    <div className="home">


      <div className="workouts(cars)">
        {cars && cars.map((car) => (
          <CarDetails key={car._id} car={car} />
        ))}

      </div>


      <AddCarForm />
    </div>
  );
};

export default Home;

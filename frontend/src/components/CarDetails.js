// imports
import { useCarContext } from "../hooks/useCarContext.js";
import { useState } from "react";
// the following import is a component that will be rendered if the user is trying to update the information
import UpdateCarDetails from "./UpdateCarDetails.js";

// the purpose of this component is to create a car that displays the information relating to each entry in the db
// there will be 2 states which will determine whether the user is viewing or updating the information

const CarDetails = ({ car }) => {
    // create state
    const [isUpdating, setIsUpdating] = useState(false);
    // destructure the context for the dispatch function
    const { dispatch } = useCarContext();

    // create a handle delete function that will make a simple api request and delete the document with the relevant ID
    const handleDelete = async () => {
        const res = await fetch(`/api/cars/delete/${car._id}`, {
            method: 'DELETE'
        });
        const data = await res.json();

        // if the response is valid, the global state will be updated using the dispatch function 
        if (res.ok) {
            dispatch({ type: 'DELETE_CAR', payload: data });
        }
    };

    return (
        <div className="car-details">
            {/* 
            Like I said above, 2 different components will be rendered depending on the isUpdating state
            If that state is TRUE, then the UpdateCarDetails comp will be rendered 
            If not, then simply the information will be rendered 
             */}
            <div className="details">
                {/* I have passed the setIsUpdating function as a prop to change the state from within the child component */}
                {isUpdating ? <UpdateCarDetails car={car} state={setIsUpdating} /> :
                    <>
                        <h4>{`${car.make}  ${car.model}`}</h4>
                        <p><strong>Owner</strong>: {car.owner}</p>
                        <p><strong>Registration number</strong>: {car.registration}</p>
                        <p><strong>Release year</strong>: {car.year}</p>
                        <span className="deleteButton button" onClick={handleDelete}>Delete</span>
                        {/* using the setIsUpdating function to change the state of the component */}
                        <span className="updateButton button" onClick={() => setIsUpdating(prev => !prev)}>Update</span>
                    </>
                }
            </div>
        </div>

    );
};

export default CarDetails;
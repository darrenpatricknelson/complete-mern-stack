// imports 
import { useState } from "react";
import { useCarContext } from "../hooks/useCarContext.js";

// So, the purpose of this component is to display a form with the information about a particular car
// the user will then be able to UPDATE that information 
// Once he clicks confirm update, an api patch request will be made and the information will be updated in the database
// I prefer using PATCH instead of PUT because PATCH only updates the information provided and leaves the other fields in the document alone

const UpdateCarDetails = ({ car, state }) => {
    // destructure the context 
    const { dispatch } = useCarContext();
    // create state
    const [make, setMake] = useState(car.make);
    const [model, setModel] = useState(car.model);
    const [registration, setRegistration] = useState(car.registration);
    const [owner, setOwner] = useState(car.owner);
    const [year, setYear] = useState(car.year);

    // handleUpdate function
    const handleUpdate = async () => {
        // create a new car object
        const updatedCar = {
            make: make,
            model: model,
            registration: registration,
            owner: owner,
            year: year
        };

        // api request using the car ID
        const res = await fetch(`/api/cars/update/${car._id}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedCar),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // the data returned is the updated db
        const data = await res.json();

        // if the response is ok, update the global state and change back to viewing state
        if (res.ok) {
            dispatch({ type: 'UPDATE_CAR', payload: data });
            state(prev => !prev);

        }
    };


    // Again, its just a simple form and does not need many comments
    return (
        <>
            <div className="updateCar">
                <h4>Update this document</h4>
                <form>
                    <input type="text" placeholder='Make' value={make} onChange={(e) => setMake(e.target.value)} />
                    <input type="text" placeholder='Model' value={model} onChange={(e) => setModel(e.target.value)} />
                    <input type="text" placeholder='Registration number' value={registration} onChange={(e) => setRegistration(e.target.value)} />
                    <input type="text" placeholder='Owner' value={owner} onChange={(e) => setOwner(e.target.value)} />
                    <input type="text" placeholder='Year' value={year} onChange={(e) => setYear(e.target.value)} />
                </form>
            </div>
            <span className="cancelUpdateButton button" onClick={() => state(prev => !prev)}>Cancel update</span>
            <span className="confirmUpdateButton button" onClick={handleUpdate}>Confirm update</span>
        </>

    );
};

export default UpdateCarDetails;
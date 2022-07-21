// Imports 
import { useState } from "react";
import { useCarContext } from '../hooks/useCarContext.js'; // the context that we created


// The purpose of this component is to display a simply form on the side of the rendered db content
//  That form can be used to add a new car to the database
const AddCarForm = () => {
    // destructuring the dispatch function
    const { dispatch } = useCarContext();
    // creating state
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [registration, setRegistration] = useState('');
    const [owner, setOwner] = useState('');
    const [year, setYear] = useState('');
    const [error, setError] = useState(null);

    // this function will be triggered when the user submits his/ her form
    const handleSubmit = async (e) => {
        e.preventDefault();

        // create an object that will be the request body
        const car = {
            make, model, registration, owner, year
        };

        // the fetch request made to the api
        const response = await fetch('/api/cars/create/', {
            method: 'POST',
            body: JSON.stringify(car),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // creating the data object 
        const data = await response.json();

        // checking if the response was was ok
        if (!response.ok) {
            return setError(`Please fill in ALL the fields`);
        }
        // if the response is ok, we can then set states to their original state 
        setMake('');
        setModel('');
        setRegistration('');
        setOwner('');
        setYear('');
        setError(null);
        // add update the global state to display the new update object list in the db
        dispatch({ type: 'CREATE_CARS', payload: data });
    };


    return (
        // pretty simply form, I don't think I need to add comments to explain it
        <form className="create" onSubmit={handleSubmit} >
            <h3>Add a new Car</h3>
            <input placeholder="Car make" type="text" onChange={(e) => { setMake(e.target.value); }} value={make} />
            <input placeholder="Car model" type="text" onChange={(e) => { setModel(e.target.value); }} value={model} />
            <input placeholder="Car registration number" type="text" onChange={(e) => { setRegistration(e.target.value); }} value={registration} />
            <input placeholder="Car owner" type="text" onChange={(e) => { setOwner(e.target.value); }} value={owner} />
            <input placeholder="Car year" type="number" maxLength={4} onChange={(e) => { setYear(e.target.value); }} value={year} />
            <br></br>
            <button className="button">Add new car</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default AddCarForm;
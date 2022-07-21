// imports 
// we will be using createContext for global props as well as useReducer to update the state reactively  
import { createContext, useReducer } from 'react';

// create our context
export const CarContext = createContext();

// create my reducer function
export const carsReducer = (state, action) => {
    // so from my understanding, switch case is a simple function that has many outcomes depending on the type argument given when the function is called 
    // in this switch, we have 4 different cases which we will do to update the state depending on which CRUD function was called
    // and theres a 5th case which is the default case that will only run if none of the other 4 cases are executed
    // just a note, from my api, I've set the response to be the updated db content
    // therefore, in the frontend I can just update the state using the payload returned from the dispatch function
    switch (action.type) {
        case 'GET_CARS':
            return {
                cars: action.payload
            };
        case 'CREATE_CARS':
            return {
                cars: action.payload
            };
        case 'UPDATE_CAR':
            return {
                cars: action.payload
            };
        case 'DELETE_CAR':
            return {
                cars: action.payload
            };

        default:
            return state;
    }
};

// I have come to the realization that we are updating the state the exact same way in each case above and therefor do not need a switch case function
// however, I have decided to leave this in because it is part of my working 
// and only while working and re-working the api, I came to this conclusion
// When I get time in the future, a refactor will definitely be fun for this app because there is a lot I can clean up
// Please do not mark me down for leaving this in and not just refactoring it :(

export const CarContextProvider = ({ children }) => {
    // initially we set the state of cars to null but we will use the carsReducer function to do the switch case updates and reactively reset the cars object to what they need to be
    // This helps further in the program when we make api calls and have to re-render the information
    const [state, dispatch] = useReducer(carsReducer, {
        cars: null
    });

    // from my understanding, the .Provider part added the end of the element is how we pass props
    // through an entire working tree
    // I have wrapped my contextProvider around the App component that was rendered in the index.js file
    // The reason I did this is because I want the state and the dispatch function available to me globally
    return (
        <CarContext.Provider value={{ ...state, dispatch }}>
            {children}
        </CarContext.Provider>
    );
};

/* 
I will admit, useContext was not 100% my idea

I was passing a function down as props through each component that I used
However, after sitting with a guy at work, he explained useContext and useReducer to me

I do understand and do claim this as my own work, just thought I'd make mention as to where I go the idea to use useContext and useReducer

:)

*/

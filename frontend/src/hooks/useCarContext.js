// imports
import { CarContext } from '../context/Cars.Context.js';
import { useContext } from 'react';

// In this file, we simply creating the useContext hook so that we can use iot globally 


export const useCarContext = () => {
    // create the context
    const context = useContext(CarContext);

    // if context is null, we will throw and error
    // this will only happen if we try to use the context outside of the functioning tree
    // However, since we wrapped the contextProvider around the App component in index.js
    // This error will most likely never be thrown
    if (!context) {
        throw Error('useCarsContext must be used inside a CarContextProvider');
    }

    // return the context
    return context;
};


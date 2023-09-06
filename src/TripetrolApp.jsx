import PropTypes from 'prop-types';
import { useState } from 'react';
export function App({value}){

    const [counter, setCounter] = useState(0);
    const handleAdd = (event) => {
        setCounter(counter+1)
    }    
    const handleSub = (event) => {
        setCounter(counter-1)
    }
    const handleReset = (event) => {
        setCounter(0)
    }
    return (
    <>
        <h1>CounterApp</h1>
        <h2> { counter } </h2>
        <button onClick={ handleAdd }>
            +1
        </button>
        <button onClick={ handleSub }>
            -1
        </button>
        <button onClick={ handleReset }>
            Reset
        </button>
    </>
    );
}

App.propTypes = {
    title: PropTypes.number
}

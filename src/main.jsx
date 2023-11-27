import React from 'react'
import ReactDOM from 'react-dom/client'
import './input.css';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
ReactDOM.createRoot(document.getElementById ('root')).render(
    <BrowserRouter>
        <App/>

    </BrowserRouter>
    /*<React.StrictMode>
    </React.StrictMode>*/
);
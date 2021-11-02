import React from "react";
import './App.css';
import {BrowserRouter} from "react-router-dom";
import App from "./Components/App";

function AppContainer() {

    return (
        <div className="App">
            <BrowserRouter>
                    <App />
            </BrowserRouter>
        </div>
    );
}

export default React.memo(AppContainer)

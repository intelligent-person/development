import React from "react";
import './App.css';
import {BrowserRouter} from "react-router-dom";
import App from "./Components/App";
import {useAuth0} from "@auth0/auth0-react";

function AppContainer() {

    console.log('sdfs')
    return (
        <div className="App">
            <BrowserRouter>
                    <App />
            </BrowserRouter>
        </div>
    );
}

export default React.memo(AppContainer)

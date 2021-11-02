import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from "react-redux";
import store from "./Redux/redux-store";
import {Auth0Provider} from "@auth0/auth0-react";
import Loader from "./Components/Loader/Loader";

const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID

const AppContainer = React.lazy(() => import('./AppContainer'))

ReactDOM.render(
    <Auth0Provider domain={domain} clientId={clientId} redirectUri={window.location.origin}>
        <React.StrictMode>
            <Provider store={store}>
                <React.Suspense fallback={<Loader/>}>
                    <AppContainer/>
                </React.Suspense>
            </Provider>
        </React.StrictMode>
    </Auth0Provider>,
    document.getElementById('root')
);


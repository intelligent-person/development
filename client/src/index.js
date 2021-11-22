import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import Loader from "./Components/Loader/Loader";
import "./utils/i18n";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "./hooks/queryClient";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const App = React.lazy(() => import("./Components/App"));

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
  >
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <React.Suspense fallback={<Loader />}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </React.Suspense>
      </React.StrictMode>
    </QueryClientProvider>
  </Auth0Provider>,
  document.getElementById("root")
);

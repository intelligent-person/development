import React from "react";
import Loader from "../Components/Loader/Loader";

export const withSuspense = (Component, props)  => {
    return <React.Suspense fallback={<Loader/>}>
        <Component {...props} />
    </React.Suspense>

}
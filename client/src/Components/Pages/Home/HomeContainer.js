import React, {useEffect} from 'react';
import {connect, useDispatch} from "react-redux";
import {addUser} from "../../../Redux/user-reducer";
import {useAuth0} from "@auth0/auth0-react";

const HomeContainer = () => {
    const {user, isAuthenticated} = useAuth0()
    const dispatch = useDispatch()
    useEffect(() => {
        if (isAuthenticated) {
            const newUser = {
                name: user.name,
                picture: user.picture,
                reputation: 0,
                email: user.email,
                sub: user.sub,
                status: 'Новичёк'
            }
            dispatch(addUser(newUser))
        }
    }, [isAuthenticated])
    return (
        <div>
            <h1>Home</h1>
        </div>
    );
};

export default React.memo(HomeContainer)
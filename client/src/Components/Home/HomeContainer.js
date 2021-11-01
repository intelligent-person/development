import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {addUser} from "../../Redux/user-reducer";

const HomeContainer = ({user, isAuthenticated, addUser}) => {
    console.log(isAuthenticated)
    useEffect(() => {
        if (isAuthenticated){
            addUser(user.name, user.picture, 0, user.email, user.sub, 'Новичёк')
        }
    }, [!isAuthenticated])
    return (
        <div>
<h1>Home</h1>
        </div>
    );
};

const mapStateToProps = state => ({})

export default React.memo(connect(mapStateToProps, {addUser})(HomeContainer))
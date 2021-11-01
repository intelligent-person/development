import React, {useState} from 'react';
import {useAuth0} from "@auth0/auth0-react";
import JSONPretty from "react-json-pretty";

const Users = ({users, delUser}) => {
    const deleteUser = (id) => {
        delUser(id)
    }
    return (
        <div>
            {users.map(user =>
                <div
                    key={user._id}>
                    <img style={{width: '50px', height: '50px'}} src={`${user.picture}`} alt=""/>
                    <b>{user.name}</b> <br/>
                    Reputation: <b>{user.reputation}</b> <br/>
                    <b>{user.status}</b>
                    <button
                        onClick={ () => deleteUser(user._id) }>DELETE
                    </button>
                </div>)}
            {/*{isAuthenticated &&*/}
            {/*    <>*/}
            {/*        <JSONPretty data={user}/>*/}
            {/*        <h2>{user.name}</h2>*/}
            {/*        <img src={user.picture} alt={user.name}/>*/}
            {/*    </>*/}
            {/*}*/}

        </div>
    )
}

export default React.memo(Users)
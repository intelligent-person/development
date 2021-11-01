import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {addUser, delUser, getUsers} from "../../Redux/user-reducer";
import Users from "./Users";
import {Breadcrumb} from "antd";
import {NavLink} from "react-router-dom";
import {Content} from "antd/es/layout/layout";

const UsersContainer = ({users, getUsers, delUser}) => {
    useEffect(() => {
        getUsers()
    }, [])
    const routes = [
        {
            path: '/users',
            breadcrumbName: 'Пользователи',
        }
    ];
    function itemRender(route, params, routes, paths) {
        const last = routes.indexOf(route) === routes.length - 1;
        return last ? (
            <span>{route.breadcrumbName}</span>
        ) : (
            <NavLink to={paths.join('/')}>{route.breadcrumbName}</NavLink>
        );
    }
    console.log(users)
    return <>
        <Breadcrumb itemRender={itemRender} style={{margin: '16px 0'}} routes={routes}/>
        <Content className="site-layout-background" style={{padding: 24, margin: 0, minHeight: 280,}}>
            <Users users={users} delUser={delUser} />
        </Content>
    </>
}


const mapStateToProps = state => ({
    users: state.users.users,
})

export default React.memo(connect(mapStateToProps, {getUsers, delUser})(UsersContainer))
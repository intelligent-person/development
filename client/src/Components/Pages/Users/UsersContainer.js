import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteUser, getUsers} from "../../../Redux/user-reducer";
import Users from "./Users";
import {Breadcrumb} from "antd";
import {NavLink} from "react-router-dom";
import {Content} from "antd/es/layout/layout";

const UsersContainer = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users.users)
    useEffect(() => {
        dispatch(getUsers())
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
    return <>
        <Breadcrumb itemRender={itemRender} style={{margin: '16px 0'}} routes={routes}/>
        <Content className="site-layout-background" style={{padding: 24, margin: 0, minHeight: 280,}}>
            <Users users={users} deleteUser={dispatch(deleteUser)} />
        </Content>
    </>
}

export default React.memo(UsersContainer)
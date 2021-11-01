import React, {useEffect, useState} from 'react';
import {Col, Menu, Row} from "antd";
import LogoutButton from "./LogoutButton";
import {Header} from "antd/es/layout/layout";
import {NavLink, Route} from "react-router-dom";
import LoginButton from "./LoginButton";


const HeaderComponent = ({user, isAuthenticated, }) => {
    const [selectedKeys, setSelectedKeys] = useState(window.location.pathname)
    return (
        <Header className="header" style={{ position: 'fixed', zIndex: 2, width: '100%' }}>
            <div className="logo"/>
            <Row justify="space-between">
                <Col span={20}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['/']} selectedKeys={[selectedKeys]}>
                        <Menu.Item key="/" onClick={(item) => setSelectedKeys(item.key)}>
                            <NavLink to={'/'}>Главная</NavLink>
                        </Menu.Item>
                        <Menu.Item key='/questions' onClick={(item) => setSelectedKeys(item.key)}>
                            <NavLink to={'/questions'}>Вопросы</NavLink>
                        </Menu.Item>
                        <Menu.Item key='/users' onClick={(item) => setSelectedKeys(item.key)}>
                            <NavLink to={'/users'}>Пользователи</NavLink>
                        </Menu.Item>
                    </Menu>
                </Col>
                <Col>
                    {isAuthenticated
                        ? <LogoutButton user={user}/>
                        : <LoginButton/>
                        }
                </Col>
            </Row>
        </Header>
    );
};

export default React.memo(HeaderComponent)
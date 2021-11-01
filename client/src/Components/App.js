import React, {useState} from 'react';
import 'antd/dist/antd.css';
import '../App.css';
import {Layout, Menu} from 'antd';
import {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined
} from '@ant-design/icons';
import HeaderComponent from "./HeaderComponent";
import ContentContainer from "./ContentContainer/ContentContainer";
import {useAuth0} from "@auth0/auth0-react";

const {SubMenu} = Menu;
const {Sider} = Layout;

const App = () => {
    const [selectedKeys, setSelectedKeys] = useState(window.location.pathname)
    const {user, isAuthenticated} = useAuth0()
    return (
        <Layout>
            <HeaderComponent selectedKeys={selectedKeys} setSelectedKeys={setSelectedKeys} user={user} isAuthenticated={isAuthenticated}/>
            <Layout style={{marginTop: 64}}>
                <Sider width={200} className="site-layout-background" >
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{position: 'fixed', zIndex: 1, height: '100%', width: 200, borderRight: 0}}

                    >
                        <SubMenu key="sub1" icon={<UserOutlined/>} title="subnav 1">
                            <Menu.Item key="1">option1</Menu.Item>
                            <Menu.Item key="2">option2</Menu.Item>
                            <Menu.Item key="3">option3</Menu.Item>
                            <Menu.Item key="4">option4</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<LaptopOutlined/>} title="subnav 2">
                            <Menu.Item key="5">option5</Menu.Item>
                            <Menu.Item key="6">option6</Menu.Item>
                            <Menu.Item key="7">option7</Menu.Item>
                            <Menu.Item key="8">option8</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" icon={<NotificationOutlined/>} title="subnav 3">
                            <Menu.Item key="9">option9</Menu.Item>
                            <Menu.Item key="10">option10</Menu.Item>
                            <Menu.Item key="11">option11</Menu.Item>
                            <Menu.Item key="12">option12</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <ContentContainer user={user} isAuthenticated={isAuthenticated}/>
            </Layout>
        </Layout>
    );
};

export default React.memo(App)
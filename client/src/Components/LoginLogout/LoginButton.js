import React from 'react';
import {useAuth0} from "@auth0/auth0-react";
import {Button} from "antd";
import Avatar from "antd/es/avatar/avatar";
import {UserOutlined} from "@ant-design/icons";

const LoginButton = () => {
    const {loginWithRedirect} = useAuth0()
    return <Button type={'link'} onClick={() => loginWithRedirect()}>
        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
    </Button>
};

export default React.memo(LoginButton)
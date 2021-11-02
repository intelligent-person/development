import React from 'react';
import {Breadcrumb} from "antd";
import {HomeOutlined} from "@ant-design/icons";
import {NavLink, useLocation} from "react-router-dom";

const PostsBreadCrumb = () => {
    const {pathname} = useLocation()
    let bname = null
    if (pathname.split('/')[2] === 'ask') {
        bname = 'Задать вопрос'
    } else bname = 'Очень сложный вопрос'
    const routes = [
        {
            path: pathname.split('/')[1],
            breadcrumbName: <HomeOutlined/>,
        },
        {
            path: pathname.split('/')[2],
            breadcrumbName: bname,
        },
    ];

    function itemRender(route, params, routes, paths) {

        const last = routes.indexOf(route) === routes.length - 1;
        if (route.path || route.path === '') {
            return last ? (
                <span>{route.breadcrumbName}</span>
            ) : (
                <NavLink to={`/${paths.slice(0, routes.indexOf(route) + 1).join('/')}`}>{route.breadcrumbName}</NavLink>
            );
        }
    }
    return <Breadcrumb itemRender={itemRender} style={{margin: '8px 0'}} routes={routes}/>
};

export default React.memo(PostsBreadCrumb)
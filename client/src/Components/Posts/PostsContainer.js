import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {addPost, getPosts} from "../../Redux/posts-reducer";
import Posts from "./Posts";
import {Breadcrumb, Button, Pagination} from "antd";
import {Content} from "antd/es/layout/layout";
import {Link, NavLink, Route, Switch, useLocation} from "react-router-dom";
import PostCreator from "./PostCreator/PostCreator";
import {HomeOutlined} from "@ant-design/icons";
import {getUser} from "../../Redux/user-reducer";
import {withSuspense} from "../../hoc/WithSuspense";
import Loader from "../Loader/Loader";

const PostInfoContainer = React.lazy(() => import('../Posts/PostInfo/PostInfoContainer'))

const PostsContainer = ({posts, getPosts, addPost, user, getUser, mainUser, postsCount}) => {
    const [pageSize, setPageSize] = useState(10)
    const [page, setPage] = useState(1)
    useEffect(async () => {
        await getPosts(pageSize, page)
        window.scrollTo(0,0)
    }, [posts.length, page, pageSize])
    useEffect(() => {
        user && getUser(user.sub)
    }, [user])
    const {pathname} = useLocation()
    const setSize = (page, pageSize) => {
        setPage(page)
        setPageSize(pageSize)
    }
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

    return (
        <>
            <Breadcrumb itemRender={itemRender} style={{margin: '8px 0'}} routes={routes}/>
            <Content className="site-layout-background" style={{padding: 24, margin: 0, minHeight: 280,}}>
                <Switch>

                    <Route path={'/questions'} exact={true} render={() =>
                        <>
                            <Posts posts={posts} user={mainUser} setPageSize={setPageSize} setPage={setPage}/>
                            <div style={{textAlign: 'center', marginTop: 50}}>
                                <Pagination defaultCurrent={1} total={postsCount} onChange={setSize} current={page}/>
                            </div>
                        </>}
                    />

                    <Route path={'/questions/id/'} render={() =>
                        <React.Suspense fallback={<Loader/>}>
                            <PostInfoContainer user={user}/>
                        </React.Suspense>}
                    />

                    <Route path={'/questions/ask'} exact={true} render={() =>
                        <PostCreator addPost={addPost} user={mainUser}/>}
                    />

                </Switch>
            </Content>
        </>
    );
};

const mapStateToProps = state => ({
    posts: state.posts.posts,
    postsCount: state.posts.postsCount,
    mainUser: state.users.user
})

export default React.memo(connect(mapStateToProps, {getPosts, addPost, getUser})(PostsContainer))
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getPosts} from "../../../Redux/posts-reducer";
import Posts from "./Posts";
import {Pagination} from "antd";
import {Content} from "antd/es/layout/layout";
import {Route, Switch} from "react-router-dom";
import PostCreator from "./PostCreator/PostCreator";
import {getUser} from "../../../Redux/user-reducer";
import Loader from "../../Loader/Loader";
import PostsFilter from "./PostsFilter";
import PostsBreadCrumb from "./PostsBreadCrumb";
import {useAuth0} from "@auth0/auth0-react";

const PostInfoContainer = React.lazy(() => import('./PostInfo/PostInfoContainer'))

const PostsContainer = () => {
    const dispatch = useDispatch()
    const posts = useSelector(state => state.posts.posts)
    const postsCount = useSelector(state => state.posts.postsCount)
    const mainUser = useSelector(state => state.users.user)
    const [pageSize, setPageSize] = useState(10)
    const [page, setPage] = useState(1)
    const [sort, setSort] = useState('newest')
    const [include, setInclude] = useState({unanswered: false})
    console.log(include)
    const {user} = useAuth0()

    useEffect(() => {
        dispatch(getPosts(pageSize, page, sort, include))
        window.scrollTo(0,0)
    }, [posts.length, page, pageSize, sort, include])

    useEffect(() => {
        user && dispatch(getUser(user.sub))
    }, [user])

    const setSize = (page, pageSize) => {
        setPage(page)
        setPageSize(pageSize)
    }

    return (
        <>
            <PostsBreadCrumb/>
            <Content className="site-layout-background" style={{padding: 24, margin: 0, minHeight: 280,}}>
                <Switch>
                    <Route path={'/questions'} exact={true} render={() =>
                        <>
                            <PostsFilter user={mainUser} postsCount={postsCount} setSort={setSort} setInclude={setInclude} setPage={setPage}/>
                            <Posts posts={posts}/>
                            <div style={{textAlign: 'center', marginTop: 50}}>
                                <Pagination defaultCurrent={1} total={postsCount} onChange={setSize} current={page}/>
                            </div>
                        </>}
                    />
                    <Route path={'/questions/id/:postId'} render={() =>
                        <React.Suspense fallback={<Loader/>}>
                            <PostInfoContainer user={user}/>
                        </React.Suspense>}
                    />
                    <Route path={'/questions/ask'} exact={true} render={() =>
                        <PostCreator user={mainUser}/>}
                    />
                </Switch>
            </Content>
        </>
    );
};

export default React.memo(PostsContainer)
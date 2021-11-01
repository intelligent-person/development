import React from 'react';
import {Route, Switch} from "react-router-dom";
import {withSuspense} from "../../hoc/WithSuspense";
import {Layout} from "antd";

const HomeContainer = React.lazy(() => import('../Home/HomeContainer'))
const PostsContainer = React.lazy(() => import('../Posts/PostsContainer'))
const UsersContainer = React.lazy(() => import('../Users/UsersContainer'))

const ContentContainer = ({user, isAuthenticated}) => {
    return (
        <Layout style={{padding: '0 24px 24px', marginTop: 0}}>
            <Switch>
                <Route path={'/'} exact={true} render={() => withSuspense(HomeContainer, {user, isAuthenticated})}/>
                <Route path={'/questions'} render={() => withSuspense(PostsContainer, {user})}/>
                <Route path={'/users'} render={() => withSuspense(UsersContainer)}/>
            </Switch>
        </Layout>
    );
};

export default React.memo(ContentContainer)
import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import {connect} from "react-redux";
import {getPost, setPostView} from "../../../Redux/posts-reducer";
import PostInfo from "./PostInfo";
import Loader from "../../Loader/Loader";

const PostInfoContainer = ({setPostView, post, getPost}) => {
    const {pathname} = useLocation()
    const postId = pathname.split('/')[3]
    console.log(postId)
    console.log(post)
    useEffect(() => {
        getPost(postId)
        setPostView(postId)
    }, [])
    if (post._id === postId) return <PostInfo post={post}/>
    else return <Loader/>
};
const mapStateToProps = state => ({
    post: state.posts.post
})

export default React.memo(connect(mapStateToProps, {getPost, setPostView})(PostInfoContainer))
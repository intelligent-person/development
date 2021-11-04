import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getPost, setPostView} from "../../../../Redux/posts-reducer";
import PostInfo from "./PostInfo";
import Loader from "../../../Loader/Loader";

const PostInfoContainer = () => {
    const dispatch = useDispatch()
    const post = useSelector(state => state.posts.post)
    const {postId} = useParams();
    useEffect(() => {
        dispatch(getPost(postId))
        dispatch(setPostView(postId))
    }, [dispatch, postId])
    if (post._id === postId) return <PostInfo post={post}/>
    else return <Loader/>
};

export default React.memo(PostInfoContainer)
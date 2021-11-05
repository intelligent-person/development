import {postsAPI} from "../api/api";


const SET_POSTS = 'SET_POSTS'
const SET_POST = 'SET_POST'
const ADD_POST = 'ADD_POST'
const SET_TAG_COUNT = 'SET_TAG_COUNT'

const initialState = {
    posts: [],
    postsCount: null,
    post: {},
    tagsCount: null
}

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POSTS:
            return {...state, posts: action.posts, postsCount: action.postsCount}
        case SET_POST:
            return {...state, post: action.post}
        case SET_TAG_COUNT:
            return {...state, tagsCount: action.tagCount}
        case ADD_POST:
            return {...state, posts: [...state.posts, action.post]}
        default:
            return state
    }
}
const setPosts = (posts) => ({type: SET_POSTS, posts: posts[0], postsCount: posts[1]})
const setPost = (post) => ({type: SET_POST, post})
const addNewPost = (post) => ({type: ADD_POST, post})
const setTagCount = (tagCount) => ({type: SET_TAG_COUNT, tagCount})



export const getPosts = (pageSize, page, sort, include, searchValue) => async (dispatch) => {
    let res = await postsAPI.getPosts(pageSize, page, sort, include, searchValue)
    console.log(res.data)
    dispatch(setPosts(res.data))
}
export const getPost = (id) => async (dispatch) => {
    let res = await postsAPI.getPost(id)
    dispatch(setPost(res.data))
}
export const addPost = (newPost) => async (dispatch) => {
    let res = await postsAPI.addPost(newPost)
    dispatch(addNewPost(res.data))
}
export const setPostView = (id) => async () =>{
    await postsAPI.setPostView(id)
}
export const getTagCount = (tag) => async (dispatch) =>{
    const res = await postsAPI.getTagCount(tag)
    dispatch(setTagCount(res.data))
}

export const deletePost = (id) => async (dispatch) => {
    let res = await postsAPI.deletePost(id)
    dispatch(setPosts(res.data))
}

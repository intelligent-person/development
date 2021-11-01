import {usersAPI} from "../api/api";

const SET_USERS = 'SET_USERS'
const SET_USER = 'SET_USER'
const ADD_USER = 'ADD_USER'

const initialState = {
    users: [],
    user: null
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {...state, users: action.users}
        case SET_USER:
            return {...state, user: action.user}
        case ADD_USER:
            let newUser = {
                id: action._id,
                name: action.name,
                picture: action.picture,
                reputation: action.reputation,
                email: action.email,
                status: action.status,
                sub: action.sub
            }
            return {...state, users: [...state.users, newUser]}
        default:
            return state
    }
}
//ACTION CREATOR=======================================
const setUsers = (users) => ({type: SET_USERS, users})
const setUser = (user) => ({type: SET_USER, user})
const addNewUser = (id, name, picture, reputation, email, sub, status) => ({type: ADD_USER, id, name, picture, reputation, email, sub, status})


//THUNK CREATOR========================================
export const getUsers = () => async (dispatch) => {
    let res = await usersAPI.getUsers()
    dispatch(setUsers(res.data))
}
export const getUser = (sub) => async (dispatch) => {
    let res = await usersAPI.getUser(sub)
    dispatch(setUser(res.data))
}
export const addUser = (name, picture, reputation, email, sub, status) => async (dispatch) => {
    let res = await usersAPI.addUser(name, picture, reputation, email, sub, status)
    dispatch(addNewUser(res.data))
}
export const delUser = (id) => async (dispatch) => {
    let res = await usersAPI.delUser(id)
    console.log(res)
    dispatch(setUsers(res.data))
}

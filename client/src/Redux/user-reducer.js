import { usersAPI } from "../api/api";

const SET_USERS = "SET_USERS";
const SET_USER = "SET_USER";

const initialState = {
  users: [],
  user: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return { ...state, users: action.users };
    case SET_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
};
//ACTION CREATOR=======================================
const setUsers = (users) => ({ type: SET_USERS, users });
const setUser = (user) => ({ type: SET_USER, user });

//THUNK CREATOR========================================
export const getUsers = () => async (dispatch) => {
  let res = await usersAPI.getUsers();
  dispatch(setUsers(res.data));
};
export const getUser = (sub) => async (dispatch) => {
  let res = await usersAPI.getUser(sub);
  dispatch(setUser(res.data));
};
export const addUser = (newUser) => async () => {
  await usersAPI.addUser(newUser);
};
export const deleteUser = (id) => async (dispatch) => {
  let res = await usersAPI.deleteUser(id);
  console.log(res);
  dispatch(setUsers(res.data));
};

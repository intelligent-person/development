import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { userReducer } from "./user-reducer";
import { postReducer } from "./posts-reducer";

const rootReducer = combineReducers({
  users: userReducer,
  posts: postReducer,
});

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

// @ts-ignore
window.__store__ = store;
export default store;

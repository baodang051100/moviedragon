import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import movieReducer from "./slice/movieSlice";
import listReducer from "./slice/listSlice";
import userReducer from "./slice/userSlice";
import myListReducer from "./slice/myListSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    movie: movieReducer,
    list: listReducer,
    user: userReducer,
    myList: myListReducer,
})

const store = configureStore({
    reducer: rootReducer,
})

export default store;
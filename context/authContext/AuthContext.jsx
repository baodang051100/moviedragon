import { createContext, useEffect, useReducer } from "react";
import { authReducer } from "./AuthReducer";

const initialState = {
    user: JSON.parse(sessionStorage.getItem("user")) || null,
    isFetching: false,
    error: false
};

export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        sessionStorage.setItem("user", JSON.stringify(state.user));
        //console.log(localStorage.getItem("user"));
    },[state.user])

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
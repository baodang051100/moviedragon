import { createContext, useReducer } from "react";
import { UsersReducer } from "./UserReducer";

const initialState = {
    users: [],
    isFetching: false,
    error: false
};

export const UsersContext = createContext(initialState);

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UsersReducer, initialState);

    return (
        <UsersContext.Provider
            value={{
                users: state.users,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}
        >
            {children}
        </UsersContext.Provider>
    )
}
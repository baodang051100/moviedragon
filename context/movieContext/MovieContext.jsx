import { createContext, useReducer } from "react";
import { MoviesReducer } from "./MovieReducer";

const initialState = {
    movies: [],
    isFetching: false,
    error: false
};

export const MoviesContext = createContext(initialState);

export const MovieContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(MoviesReducer, initialState);

    return (
        <MoviesContext.Provider
            value={{
                movies: state.movies,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}
        >
            {children}
        </MoviesContext.Provider>
    )
}
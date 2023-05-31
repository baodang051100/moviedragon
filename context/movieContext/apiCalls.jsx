import {
    createMovieFailure,
    createMovieStart,
    createMovieSuccess,
    deleteMoviesFailure,
    deleteMoviesStart,
    deleteMoviesSuccess,
    getMoviesFailure,
    getMoviesStart,
    getMoviesSuccess,
    updateMovieFailure,
    updateMovieStart,
    updateMovieSuccess
}
    from "./MoviesAction";
import axios from "axios";

//GET
export const getMovies = async (dispatch) => {
    dispatch(getMoviesStart());
    try {
        const res = await axios.get("http://localhost:8000/api/movie/find/", {
            headers: {
                token: "Bearer" + JSON.parse(localStorage.getItem("user")).token,
            },
        });
        dispatch(getMoviesSuccess(res.data));
    } catch (err) {
        dispatch(getMoviesFailure());
    }
};

//CREATE
export const createMovie = async (movie, dispatch) => {
    dispatch(createMovieStart());
    try {
        const res = await axios.post("http://localhost:8000/api/movie/", movie, {
            headers: {
                token: "Bearer" + JSON.parse(localStorage.getItem("user")).token,
            },
        });
        dispatch(createMovieSuccess(res.data));
        console.log(res);
    } catch (err) {
        dispatch(createMovieFailure()); 
    }
};

//DELETE
export const deleteMovie = async (id, dispatch) => {
    dispatch(deleteMoviesStart());
    try {
        await axios.delete("http://localhost:8000/api/movie/"+id, {
            headers: {
                token: "Bearer" + JSON.parse(localStorage.getItem("user")).token,
            },
        });
        dispatch(deleteMoviesSuccess(id));
    } catch (err) {
        dispatch(deleteMoviesFailure());
    }
};

//UPDATE
export const updateMovieById = async (id, movie, dispatch) => {
    dispatch(updateMovieStart());
    try {
        await axios.put("http://localhost:8000/api/movie/"+id, movie, {
            headers: {
                token: "Bearer" + JSON.parse(localStorage.getItem("user")).token,
            },
        });
        dispatch(updateMovieSuccess(id));
    } catch (err) {
        dispatch(updateMovieFailure());
    }
};
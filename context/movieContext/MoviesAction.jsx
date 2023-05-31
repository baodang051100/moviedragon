//GET
export const getMoviesStart = () => ({
    type: "GET_MOVIES_START",
});
export const getMoviesSuccess = (movies) => ({
    type: "GET_MOVIES_SUCCESS",
    payload: movies
});
export const getMoviesFailure = () => ({
    type: "GET_MOVIES_FAILURE",
});

//GET AN MOVIE
export const getAnMoviesStart = () => ({
    type: "GET_AN_MOVIE_START",
});
export const getAnMoviesSuccess = (id) => ({
    type: "GET_AN_MOVIE_SUCCESS",
    payload: id
});
export const getAnMoviesFailure = () => ({
    type: "GET_AN_MOVIE_FAILURE",
});

//CREATE
export const createMovieStart = () => ({
    type: "CREATE_MOVIE_START",
});
export const createMovieSuccess = () => ({
    type: "CREATE_MOVIE_SUCCESS",
    payload: movie
});
export const createMovieFailure = () => ({
    type: "CREATE_MOVIE_FAILURE",
});

//DELETE
export const deleteMoviesStart = () => ({
    type: "DELETE_MOVIE_START",
});
export const deleteMoviesSuccess = (id) => ({
    type: "DELETE_MOVIE_SUCCESS",
    payload: id
});
export const deleteMoviesFailure = () => ({
    type: "DELETE_MOVIE_FAILURE",
});

//UPDATE
export const updateMovieStart = () => ({
    type: "UPDATE_MOVIE_START",
});
export const updateMovieSuccess = (id) => ({
    type: "UPDATE_MOVIE_SUCCESS",
    payload: id
});
export const updateMovieFailure = () => ({
    type: "UPDATE_MOVIE_FAILURE",
});
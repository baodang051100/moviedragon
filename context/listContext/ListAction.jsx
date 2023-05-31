//GET
export const getListsStart = () => ({
    type: "GET_LISTS_START",
});
export const getListsSuccess = (lists) => ({
    type: "GET_LISTS_SUCCESS",
    payload: lists
});
export const getListsFailure = () => ({
    type: "GET_LISTS_FAILURE",
});

// //CREATE
// export const createListtart = () => ({
//     type: "CREATE_MOVIE_START",
// });
// export const createListuccess = () => ({
//     type: "CREATE_MOVIE_SUCCESS",
//     payload: movie
// });
// export const createMovieFailure = () => ({
//     type: "CREATE_MOVIE_FAILURE",
// });

// //DELETE
// export const deleteListStart = () => ({
//     type: "DELETE_MOVIE_START",
// });
// export const deleteListSuccess = (id) => ({
//     type: "DELETE_MOVIE_SUCCESS",
//     payload: id
// });
// export const deleteListFailure = () => ({
//     type: "DELETE_MOVIE_FAILURE",
// });
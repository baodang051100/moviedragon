import axios from "axios";
import { getListsFailure, getListsStart, getListsSuccess } from "./ListAction";

//GET
// export const getLists = async (dispatch) => {
//     dispatch(getListsStart());
//     try {
//         const res = await axios.get("http://localhost:8000/api/list/", {
//             headers: {
//                 token: "Bearer" + JSON.parse(localStorage.getItem("user")).token,
//             },
//         });
//         dispatch(getListsSuccess(res.data));
//     } catch (err) {
//         dispatch(getListsFailure());
//     }
// };

// //CREATE
// export const createMovie = async (movie, dispatch) => {
//     dispatch(createMovieStart());
//     try {
//         const res = await axios.post("http://localhost:8000/api/movie/", movie, {
//             headers: {
//                 token: JSON.parse(localStorage.getItem("user")).token,
//             },
//         });
//         dispatch(createMovieSuccess(res.data));
//     } catch (err) {
//         dispatch(createMovieFailure()); 
//     }
// };

// //DELETE
// export const deleteMovie = async (dispatch) => {
//     dispatch(deleteMoviesStart());
//     try {
//         await axios.delete("http://localhost:8000/api/movie/"+id, {
//             headers: {
//                 token: "Bearer" + JSON.parse(localStorage.getItem("user")).token,
//             },
//         });
//         dispatch(deleteMoviesSuccess(id));
//     } catch (err) {
//         dispatch(deleteMoviesFailure());
//     }
// };
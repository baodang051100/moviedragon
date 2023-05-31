import axios from "axios";
import {
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    getUsersFailure,
    getUsersStart,
    getUsersSuccess
}
    from "../userContext/UserAction";

//GET
export const getUsers = async (dispatch) => {
    dispatch(getUsersStart());
    try {
        const res = await axios.get("http://localhost:8000/api/user/", {
            headers: {
                token: "Bearer" + JSON.parse(localStorage.getItem("user")).token,
            },
        });
        dispatch(getUsersSuccess(res.data));
    } catch (err) {
        dispatch(getUsersFailure());
    }
};

//DELETE
export const deleteUser = async (id, dispatch) => {
    dispatch(deleteUserStart());
    try {
        await axios.delete("http://localhost:8000/api/user/" + id, {
            headers: {
                token: "Bearer" + JSON.parse(localStorage.getItem("user")).token,
            },
        });
        dispatch(deleteUserSuccess(id));
    } catch (err) {
        dispatch(deleteUserFailure());
    }
};
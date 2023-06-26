import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';

const initialState = {
    users: [],
    show: [],
    info: [],
    loading: false,
    listFavorite: [],
}

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_URL,
});

export const getUser = createAsyncThunk("api/users/",
    async (thunkAPI) => {
        try {
            const res = await axiosInstance.get("users/", {
                headers: {
                    token: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
            });
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

export const getAnUser = createAsyncThunk("users/:id",
    async (id, thunkAPI) => {
        try {
            const res = await axiosInstance.get("users/" + id, {
                headers: {
                    token: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
            });
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

export const deleteUser = createAsyncThunk("api/users/:id",
    async (id, thunkAPI) => {
        try {
            const res = await axiosInstance.get("users/" + id, {
                headers: {
                    token: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
            });
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //-------------------GET ALL USER---------------------------------------
            .addCase(getUser.pending, (state) => {
                state.loading = true
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.show = action.payload
                state.loading = false
            })
            .addCase(getUser.rejected, (state) => {
                state.loading = false
            })
            //-------------------DELETE USER---------------------------------------
            .addCase(deleteUser.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.show = action.payload
                state.loading = false
            })
            .addCase(deleteUser.rejected, (state) => {
                state.loading = false
            })
            //-------------------GET AN USER---------------------------------------
            .addCase(getAnUser.pending, (state) => {
                state.loading = true
            })
            .addCase(getAnUser.fulfilled, (state, action) => {
                state.info = action.payload
                state.loading = false
            })
            .addCase(getAnUser.rejected, (state) => {
                state.loading = false
            })
    }
})

export const getAllShow = (state) => state.user.show;

export default userSlice.reducer;
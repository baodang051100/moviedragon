import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    users: [],
    show: [],
    loading: false,
    listFavorite: [],
}

export const getUser = createAsyncThunk("api/users/",
    async (thunkAPI) => {
        try {
            const res = await axios.get("http://localhost:8000/api/users/", {
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
            const res = await axios.get("http://localhost:8000/api/users/" + id, {
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

export const addFavorite = createAsyncThunk("api/myList/",
    async (userId, list, thunkAPI) => {
        try {
            const res = await axios.post("http://localhost:8000/api/myList/", list, userId, {
                headers: {
                    token: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
            });
            if(res.data.id) return res.data;
            console.log(res.data)
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
                console.log("get user success")
                state.show = action.payload
                state.loading = false
            })
            .addCase(getUser.rejected, (state) => {
                state.loading = false
                console.log("get user failed")
            })
            //-------------------DELETE USER---------------------------------------
            .addCase(deleteUser.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                console.log("delete user success")
                state.show = action.payload
                state.loading = false
            })
            .addCase(deleteUser.rejected, (state) => {
                state.loading = false
                console.log("delete user failed")
            })
    }
})

export const getAllShow = (state) => state.user.show;

export default userSlice.reducer;
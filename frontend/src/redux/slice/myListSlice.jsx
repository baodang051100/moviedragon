import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import axios from "axios";

const initialState = {
    myList: [],
    show: [],
    info: [],
    loading: false,
    success: false,
}

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_URL,
});

export const addMyList = createAsyncThunk("api/myList/add/",
    async (list, thunkAPI) => {
        try {
            const res = await axiosInstance.post("myList/add/", list, {
                headers: {
                    token: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
            });
            if (res.data.success === true) {
                toast.success(res.data.msg)
                return res.data;
            } else {
                toast.error(res.data.msg)
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

export const deleteMovieFromMyList = createAsyncThunk("api/delete/:id",
    async (id, thunkAPI) => {
        try {
            const res = await axiosInstance.delete("myList/delete/" + id, {
                headers: {
                    token: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
            });
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)


const myListSlice = createSlice({
    name: "myList",
    initialState,
    reducer: {},
    extraReducers: (builder) => {
        builder
            //------------------------ADD--------------------------------
            .addCase(addMyList.pending, (state) => {
                state.loading = true
            })
            .addCase(addMyList.fulfilled, (state, action) => {
                state.myList = action.payload
                state.loading = false
            })
            .addCase(addMyList.rejected, (state) => {
                state.loading = false
            })
            //------------------------DELETE FROM WATCH LIST--------------------------------
            .addCase(deleteMovieFromMyList.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteMovieFromMyList.fulfilled, (state, action) => {
                state.myList = action.payload
                state.loading = false
            })
            .addCase(deleteMovieFromMyList.rejected, (state) => {
                state.loading = false
            })
    }
})

export default myListSlice.reducer;
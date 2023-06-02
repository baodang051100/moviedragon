import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import axios from "axios";

const initialState = {
    myList: [],
    show: [],
    info: [],
    loading: false,
    total: 0,
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
            console.log(res.data)
            return res.data;
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
            return res.data;
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
                console.log("add movie to my list success");
                toast.success("Add Movie To My List Success")
                state.myList = action.payload
                state.show = action.payload
                state.loading = false
            })
            .addCase(addMyList.rejected, (state) => {
                state.loading = false
                console.log("add movie to my list failed")
            })
            //------------------------DELETE FROM WATCH LIST--------------------------------
            .addCase(deleteMovieFromMyList.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteMovieFromMyList.fulfilled, (state, action) => {
                toast.success("Delete Movie From My List Success")
                console.log("Delete Movie From My List Success")
                state.info = action.payload
                state.loading = false
            })
            .addCase(deleteMovieFromMyList.rejected, (state) => {
                console.log("Delete Movie From My List Failed")
                state.loading = false
            })
    }
})

export default myListSlice.reducer;
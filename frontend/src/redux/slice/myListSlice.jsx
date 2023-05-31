import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    myList: [],
    show: [],
    loading: false,
}

export const addMyList = createAsyncThunk("api/myList/",
    async (userId, list, thunkAPI) => {
        try {
            const res = await axios.post("http://localhost:8000/api/myList/", list, {
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
                console.log("add movie to my list success")
                state.movie = action.payload
                state.show = action.payload
                state.loading = false
            })
            .addCase(addMyList.rejected, (state) => {
                state.loading = false
                console.log("add movie to my list failed")
            })
    }
})

export default myListSlice.reducer;
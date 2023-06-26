import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    movie: [],
    show: [],
    loading: false,
    selectItem: {},
}

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_URL,
});

export const createMovie = createAsyncThunk("api/movie/",
    async (movie, thunkAPI) => {
        try {
            const res = await axiosInstance.post("http://localhost:8000/api/movie/", movie, {
                headers: {
                    token: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
            });
            if (res.data) {
                localStorage.setItem("movie", JSON.stringify(res.data));
                console.log(res.data);
            }
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

export const getAll = createAsyncThunk("api/movie/find/",
    async (thunkAPI) => {
        try {
            const res = await axiosInstance.get("movie/find/", {
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

export const getMovieRandom = createAsyncThunk("api/movie/random",
    async (type, thunkAPI) => {
        try {
            const res = await axiosInstance.get(`movie/random?type=${type}`, {
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

export const deleteMovie = createAsyncThunk("api/movie/id",
    async (id, thunkAPI) => {
        try {
            const res = await axiosInstance.delete("movie/" + id, {
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


const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        create: (state, action) => {
            state.movie = action.payload;
            localStorage.setItem("movie", JSON.stringify(state.movie))
        },
        getMovieData: (state) => {
            state.show = JSON.parse(localStorage.getItem("movie"))
        }
    },
    extraReducers: (builder) => {
        builder
            //------------------------CREATE--------------------------------
            .addCase(createMovie.pending, (state) => {
                state.loading = true
            })
            .addCase(createMovie.fulfilled, (state, action) => {
                state.movie = action.payload
                state.show = action.payload
                state.loading = false
            })
            .addCase(createMovie.rejected, (state) => {
                state.loading = false
            })
            //-----------------------------GET ALL--------------------------------
            .addCase(getAll.pending, (state) => {
                state.loading = true
            })
            .addCase(getAll.fulfilled, (state, action) => {
                state.show = action.payload
                state.loading = false
                localStorage.setItem("data", JSON.stringify(state.show))
            })
            .addCase(getAll.rejected, (state) => {
                state.loading = false
            })
            //---------------------------GET RANDOM MOVIE-------------------------------
            .addCase(getMovieRandom.pending, (state) => {
                state.loading = true
            })
            .addCase(getMovieRandom.fulfilled, (state, action) => {
                state.show = action.payload
                state.loading = false
            })
            .addCase(getMovieRandom.rejected, (state) => {
                state.loading = false
            })
            //---------------------------DELETE MOVIE-------------------------------
            .addCase(deleteMovie.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteMovie.fulfilled, (state, action) => {
                state.show = action.payload
                state.loading = false
            })
            .addCase(deleteMovie.rejected, (state) => {
                state.loading = false
            })
    }
});

export const { create, getMovieData } = movieSlice.actions;

export const getAllMovies = (state) => state.movie;
export const getAllShow = (state) => state.movie.show;
export const getLoading = (state) => state.movie.loading;

export default movieSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import { toast } from 'react-toastify';

const user = JSON.parse(localStorage.getItem("user"));
const token = JSON.parse(localStorage.getItem("token"));


const initialState = {
    user: user ? user : null,
    isLoading: false,
    token: token ? token : null,
    success: false,
};

export const register = createAsyncThunk("auth/register",
    async (user, thunkAPI) => {
        try {
            const res = await axios.post("http://localhost:8000/api/auth/register", user);
            if (res.data) {
                console.log(res.data)
                sessionStorage.setItem("user", JSON.stringify(res.data))
            }
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    });

export const login = createAsyncThunk("auth/login",
    async (user, thunkAPI) => {
        try {
            const res = await axios.post("http://localhost:8000/api/auth/login", user);
            if (res.data) {
                localStorage.setItem("user", JSON.stringify(res.data.data))
                localStorage.setItem("userId", JSON.stringify(res.data.data._id))
                localStorage.setItem("token", JSON.stringify(res.data.token))
            }
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    })


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload
        },
        addToken: (state, action) => {
            state.token = action.payload
        },
        logout: (state) => {
            state.user = null
            state.token = null
            toast.success("Logout success");
            localStorage.removeItem("user");
            localStorage.removeItem("token");

            localStorage.setItem("user", JSON.stringify(state.user));
            localStorage.setItem("token", JSON.stringify(state.token));
        }
    },
    extraReducers: (builder) => {
        builder
            //---------------------REGISTER---------------------------------------
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload
                state.isLoading = false
                state.success = true
            })
            .addCase(register.rejected, (state) => {
                state.isLoading = false
                state.success = false
            })
            //-----------------------SIGN IN-----------------------------------
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload
                state.isLoading = false
                state.success = true
            })
            .addCase(login.rejected, (state) => {
                state.isLoading = false
                state.success = false
            })
    }
});

export const { addToken, addUser, logout } = authSlice.actions;

export default authSlice.reducer;
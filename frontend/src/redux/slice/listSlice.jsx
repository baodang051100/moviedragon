import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    list: [],
    loading: false,
    show: [],
    selectList: {},
}

export const createList = createAsyncThunk("api/list/",
    async (list, thunkAPI) => {
        try {
            const res = await axios.post("http://localhost:8000/api/list/", list, {
                headers: {
                    token: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
            });
            localStorage.setItem("list", JSON.stringify(res.data));
            toast.success("add list successfully");
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
);

export const getAllList = createAsyncThunk("api/list/find/",
    async (type, genre, thunkAPI) => {
        try {
            const res = await axios.get("http://localhost:8000/api/lists",
                {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("token"))
                    },
                });
            localStorage.setItem("listData", JSON.stringify(res.data));
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

export const updateList = createAsyncThunk("api/list/update",
    async (id, selectList, thunkAPI) => {
        try {
            const res = await axios.put("http://localhost:8000/api/list/update/" + id, selectList, {
                headers: {
                    token: "Bearer " + JSON.parse(localStorage.getItem("token"))
                },
            });
            localStorage.setItem("updateList", JSON.stringify(res.data));
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

export const deleteList = createAsyncThunk("api/list/:id",
    async (id, thunkAPI) => {
        try {
            const res = await axios.delete("http://localhost:8000/api/list/" + id, {
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

const listSlice = createSlice({
    name: "list",
    initialState,
    reducers: {
        create: (state, action) => {
            state.list = action.payload
        },
        getList: (state, action) => {
            state.show = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            //CREATE
            .addCase(createList.pending, (state) => {
                state.loading = true
            })
            .addCase(createList.fulfilled, (state, action) => {
                console.log("create list success")
                state.list = action.payload
                state.show = action.payload
                state.loading = false
            })
            .addCase(createList.rejected, (state) => {
                state.loading = false
                console.log("create list failed")
            })
            //------------------------------------------------------------------------------
            //GET
            .addCase(getAllList.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllList.fulfilled, (state, action) => {
                console.log("get list success")
                state.show = action.payload
                state.loading = false
            })
            .addCase(getAllList.rejected, (state) => {
                state.loading = false
                console.log("get list failed")
            })
            //------------------------------------------------------------------------------
            //UPDATE
            .addCase(updateList.pending, (state) => {
                state.loading = true
            })
            .addCase(updateList.fulfilled, (state, action) => {
                console.log("update list success")
                state.selectList = action.payload
                state.loading = false
            })
            .addCase(updateList.rejected, (state) => {
                state.loading = false
                console.log("update list failed")
            })
            //------------------------------------------------------------------------------
            //DELTE
            .addCase(deleteList.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteList.fulfilled, (state, action) => {
                console.log("delete list success")
                state.selectList = action.payload
                state.loading = false
            })
            .addCase(deleteList.rejected, (state) => {
                state.loading = false
                console.log("delete list failed")
            })
    }
});

export const { create, getList } = listSlice.actions;

export default listSlice.reducer;
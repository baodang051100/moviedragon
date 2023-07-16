import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  list: [],
  loading: false,
  show: [],
  selectList: {},
};

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const createList = createAsyncThunk(
  "api/list/",
  async (list, thunkAPI) => {
    try {
      const res = await axiosInstance.post("list/", list, {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      });
      localStorage.setItem("list", JSON.stringify(res.data));
      toast.success("add list successfully");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const getAllList = createAsyncThunk(
  "api/list/find/",
  async (type, genre, thunkAPI) => {
    try {
      const res = await axiosInstance.get("lists", {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      });
      localStorage.setItem("listData", JSON.stringify(res.data));
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const updateList = createAsyncThunk(
  "api/list/update",
  async (id, selectList, thunkAPI) => {
    try {
      const res = await axiosInstance.put("list/update/" + id, selectList, {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      });
      localStorage.setItem("updateList", JSON.stringify(res.data));
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const deleteList = createAsyncThunk(
  "api/list/:id",
  async (id, thunkAPI) => {
    try {
      const res = await axiosInstance.delete("list/" + id, {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    create: (state, action) => {
      state.list = action.payload;
    },
    getList: (state, action) => {
      state.show = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //CREATE
      .addCase(createList.pending, (state) => {
        state.loading = true;
      })
      .addCase(createList.fulfilled, (state, action) => {
        state.list = action.payload;
        state.show = action.payload;
        state.loading = false;
      })
      .addCase(createList.rejected, (state) => {
        state.loading = false;
      })
      //------------------------------------------------------------------------------
      //GET
      .addCase(getAllList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllList.fulfilled, (state, action) => {
        state.show = action.payload;
        state.loading = false;
      })
      .addCase(getAllList.rejected, (state) => {
        state.loading = false;
      })
      //------------------------------------------------------------------------------
      //UPDATE
      .addCase(updateList.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateList.fulfilled, (state, action) => {
        state.selectList = action.payload;
        state.loading = false;
      })
      .addCase(updateList.rejected, (state) => {
        state.loading = false;
      })
      //------------------------------------------------------------------------------
      //DELTE
      .addCase(deleteList.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        state.selectList = action.payload;
        state.loading = false;
      })
      .addCase(deleteList.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { create, getList } = listSlice.actions;

export default listSlice.reducer;

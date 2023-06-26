import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name: "search",
    initialState: {
        searchInfo: "",
        category: [],
    },
    reducers: {
        updateSearch: (state, action) => {
            state.searchInfo = action.payload;
        },
        setCategoryFilter: (state, action) => {
            state.category = action.payload;
        }
    }
})
export const selectSearch = (state) => state.search.value
export const { updateSearch, setCategoryFilter } = searchSlice.actions;
export default searchSlice.reducer;